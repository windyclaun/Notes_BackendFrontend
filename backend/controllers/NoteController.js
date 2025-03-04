import Note from '../models/NoteModel.js';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createNote = async (req, res) => {
    try {
        await Note.create(req.body);
        res.status(201).json({ message: 'Note created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        await Note.update(req.body, { where: { id } });
        res.status(200).json({ message: 'Note updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await Note.destroy({ where: { id } });
        res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};