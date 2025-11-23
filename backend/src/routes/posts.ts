import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Post from '../models/Post';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map(post => ({
      id: post._id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author_id: post.author._id,
      author_username: (post.author as { username: string }).username,
      created_at: post.createdAt,
      updated_at: post.updatedAt,
      published: post.published,
    }));

    res.json(formattedPosts);
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

    res.json({
      id: post._id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author_id: post.author._id,
      author_username: (post.author as { username: string }).username,
      created_at: post.createdAt,
      updated_at: post.updatedAt,
      published: post.published,
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create post (auth required)
router.post(
  '/',
  authenticateToken,
  [
    body('title').notEmpty().trim(),
    body('content').notEmpty(),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, published = true } = req.body;

    try {
      const postExcerpt = excerpt || content.substring(0, 200) + (content.length > 200 ? '...' : '');

      const post = new Post({
        title,
        content,
        excerpt: postExcerpt,
        author: req.user!.id,
        published,
      });
      await post.save();
      await post.populate('author', 'username');

      res.status(201).json({
        id: post._id,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        author_id: post.author._id,
        author_username: (post.author as { username: string }).username,
        created_at: post.createdAt,
        updated_at: post.updatedAt,
        published: post.published,
      });
    } catch (error) {
      console.error('Create post error:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
);

// Update post (auth required)
router.put(
  '/:id',
  authenticateToken,
  [
    body('title').optional().notEmpty().trim(),
    body('content').optional().notEmpty(),
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

      const { title, content, excerpt, published } = req.body;

      if (title !== undefined) post.title = title;
      if (content !== undefined) {
        post.content = content;
        if (!excerpt) {
          post.excerpt = content.substring(0, 200) + (content.length > 200 ? '...' : '');
        }
      }
      if (excerpt !== undefined) post.excerpt = excerpt;
      if (published !== undefined) post.published = published;

      await post.save();
      await post.populate('author', 'username');

      res.json({
        id: post._id,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        author_id: post.author._id,
        author_username: (post.author as { username: string }).username,
        created_at: post.createdAt,
        updated_at: post.updatedAt,
        published: post.published,
      });
    } catch (error) {
      console.error('Update post error:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  }
);

// Delete post (auth required)
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
