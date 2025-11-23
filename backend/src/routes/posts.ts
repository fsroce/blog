import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';
import db from '../database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  published: number;
  author_username?: string;
}

// Get all posts
router.get('/', (req: Request, res: Response) => {
  try {
    const posts = db.prepare(`
      SELECT p.*, u.username as author_username
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.published = 1
      ORDER BY p.created_at DESC
    `).all() as Post[];

    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/:id', (req: Request, res: Response) => {
  try {
    const post = db.prepare(`
      SELECT p.*, u.username as author_username
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = ?
    `).get(req.params.id) as Post | undefined;

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
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
  (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, published = true } = req.body;

    try {
      const postId = uuidv4();
      const postExcerpt = excerpt || content.substring(0, 200) + (content.length > 200 ? '...' : '');

      db.prepare(`
        INSERT INTO posts (id, title, content, excerpt, author_id, published)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(postId, title, content, postExcerpt, req.user!.id, published ? 1 : 0);

      const newPost = db.prepare(`
        SELECT p.*, u.username as author_username
        FROM posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.id = ?
      `).get(postId) as Post;

      res.status(201).json(newPost);
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
  (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if post exists and belongs to user
      const existingPost = db.prepare(
        'SELECT * FROM posts WHERE id = ?'
      ).get(req.params.id) as Post | undefined;

      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (existingPost.author_id !== req.user!.id) {
        return res.status(403).json({ error: 'Not authorized to update this post' });
      }

      const { title, content, excerpt, published } = req.body;
      const updates: string[] = [];
      const values: (string | number)[] = [];

      if (title !== undefined) {
        updates.push('title = ?');
        values.push(title);
      }
      if (content !== undefined) {
        updates.push('content = ?');
        values.push(content);
        if (!excerpt) {
          updates.push('excerpt = ?');
          values.push(content.substring(0, 200) + (content.length > 200 ? '...' : ''));
        }
      }
      if (excerpt !== undefined) {
        updates.push('excerpt = ?');
        values.push(excerpt);
      }
      if (published !== undefined) {
        updates.push('published = ?');
        values.push(published ? 1 : 0);
      }

      if (updates.length > 0) {
        updates.push('updated_at = CURRENT_TIMESTAMP');
        values.push(req.params.id);

        db.prepare(`
          UPDATE posts SET ${updates.join(', ')} WHERE id = ?
        `).run(...values);
      }

      const updatedPost = db.prepare(`
        SELECT p.*, u.username as author_username
        FROM posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.id = ?
      `).get(req.params.id) as Post;

      res.json(updatedPost);
    } catch (error) {
      console.error('Update post error:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  }
);

// Delete post (auth required)
router.delete('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    // Check if post exists and belongs to user
    const existingPost = db.prepare(
      'SELECT * FROM posts WHERE id = ?'
    ).get(req.params.id) as Post | undefined;

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (existingPost.author_id !== req.user!.id) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;
