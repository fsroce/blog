import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Post from '../models/Post';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Format post for response
const formatPost = (post: any) => ({
  id: post._id,
  title: post.title,
  content: post.content,
  excerpt: post.excerpt,
  author_id: post.author._id,
  author_username: post.author.username,
  created_at: post.createdAt,
  updated_at: post.updatedAt,
  published: post.published,
  tags: post.tags || [],
  likes: post.likes?.length || 0,
  viewCount: post.viewCount || 0,
  coverImage: post.coverImage,
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { tag } = req.query;
    const query: any = { published: true };
    if (tag) query.tags = tag;

    const posts = await Post.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json(posts.map(formatPost));
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment view count
    post.viewCount = (post.viewCount || 0) + 1;
    await post.save();

    res.json(formatPost(post));
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Get related posts
router.get('/:id/related', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const relatedPosts = await Post.find({
      _id: { $ne: post._id },
      published: true,
      $or: [
        { tags: { $in: post.tags } },
        { author: post.author }
      ]
    })
      .populate('author', 'username')
      .limit(3)
      .sort({ createdAt: -1 });

    res.json(relatedPosts.map(formatPost));
  } catch (error) {
    console.error('Get related posts error:', error);
    res.status(500).json({ error: 'Failed to fetch related posts' });
  }
});

// Get all tags
router.get('/tags/all', async (req, res) => {
  try {
    const tags = await Post.aggregate([
      { $match: { published: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json(tags.map(t => ({ name: t._id, count: t.count })));
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// Create post
router.post(
  '/',
  authenticateToken,
  [
    body('title').notEmpty().trim(),
    body('content').notEmpty(),
    body('tags').optional().isArray(),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, published = true, tags = [], coverImage } = req.body;

    try {
      const postExcerpt = excerpt || content.substring(0, 200) + (content.length > 200 ? '...' : '');

      const post = new Post({
        title,
        content,
        excerpt: postExcerpt,
        author: req.user!.id,
        published,
        tags,
        coverImage,
      });
      await post.save();
      await post.populate('author', 'username');

      res.status(201).json(formatPost(post));
    } catch (error) {
      console.error('Create post error:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
);

// Update post
router.put(
  '/:id',
  authenticateToken,
  [
    body('title').optional().notEmpty().trim(),
    body('content').optional().notEmpty(),
    body('tags').optional().isArray(),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.author.toString() !== req.user!.id) {
        return res.status(403).json({ error: 'Not authorized to update this post' });
      }

      const { title, content, excerpt, published, tags, coverImage } = req.body;

      if (title !== undefined) post.title = title;
      if (content !== undefined) {
        post.content = content;
        if (!excerpt) {
          post.excerpt = content.substring(0, 200) + (content.length > 200 ? '...' : '');
        }
      }
      if (excerpt !== undefined) post.excerpt = excerpt;
      if (published !== undefined) post.published = published;
      if (tags !== undefined) post.tags = tags;
      if (coverImage !== undefined) post.coverImage = coverImage;

      await post.save();
      await post.populate('author', 'username');

      res.json(formatPost(post));
    } catch (error) {
      console.error('Update post error:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  }
);

// Toggle like
router.post('/:id/like', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const userId = req.user!.id;
    const likeIndex = post.likes.indexOf(userId as any);

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(userId as any);
    }

    await post.save();

    res.json({ likes: post.likes.length, liked: likeIndex === -1 });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Delete post
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.user!.id) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;
