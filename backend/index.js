import express from 'express';
import cors from 'cors';
import db from './config/Database.js';
import NoteRoutes from './routes/NoteRoutes.js';
import Note from './models/NoteModel.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(NoteRoutes);
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Test Database Connection
(async () => {
    try {
        await db.authenticate();
        console.log('Database connected...');
        await db.sync();
        console.log('Database synchronized...');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
