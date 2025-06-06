import cookieParser from 'cookie-parser';
import cors from 'cors';
import "dotenv/config";
import express from 'express';
import db from './config/Database.js';
import NoteRoutes from './routes/NoteRoutes.js';

const app = express();
app.set("view engine", "ejs");
app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true
}));

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
