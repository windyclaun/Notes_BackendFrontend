import express from 'express';
import {
  createNote,
  deleteNote,
  getNotes,
  login,
  logout,
  registerUser,
  updateNote
} from '../controllers/NoteController.js';

import { getAccessToken } from '../controllers/TokenController.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

// Auth routes
router.post('/login', login);
router.post('/register', registerUser);
router.delete('/logout', logout);

// Refresh token
router.get('/token', getAccessToken);

// Protected routes (require access token)
router.get('/getnotes', verifyToken, getNotes);
router.post('/addnotes', verifyToken, createNote);
router.put('/notes/:id', verifyToken, updateNote);
router.delete('/notes/:id', verifyToken, deleteNote);

export default router;
