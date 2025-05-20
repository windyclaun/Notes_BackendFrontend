import express from 'express';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  login,
  logout,
  registerUser
} from '../controllers/NoteController.js';

import { getAccessToken } from '../controllers/TokenController.js';
import { authenticateToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Auth routes
router.post('/login', login);
router.post('/register', registerUser);
router.delete('/logout', logout);

// Refresh token
router.get('/token', getAccessToken);

// Protected routes (require access token)
router.get('/notes', authenticateToken, getNotes);
router.post('/notes', authenticateToken, createNote);
router.put('/notes/:id', authenticateToken, updateNote);
router.delete('/notes/:id', authenticateToken, deleteNote);

export default router;
