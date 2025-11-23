import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';
import db from '../database';

const router = Router();

// Register
router.post(
  '/register',
  [
    body('username').isLength({ min: 3 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user exists
      const existingUser = db.prepare(
        'SELECT id FROM users WHERE username = ? OR email = ?'
      ).get(username, email);

      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const userId = uuidv4();
      db.prepare(
        'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)'
      ).run(userId, username, email, hashedPassword);

      // Generate token
      const secret = process.env.JWT_SECRET || 'default-secret';
      const token = jwt.sign({ id: userId, username }, secret, { expiresIn: '7d' });

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: { id: userId, username, email },
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user
      const user = db.prepare(
        'SELECT * FROM users WHERE email = ?'
      ).get(email) as { id: string; username: string; email: string; password: string } | undefined;

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const secret = process.env.JWT_SECRET || 'default-secret';
      const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '7d' });

      res.json({
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

export default router;
