import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Note from '../models/NoteModel.js';
import User from '../models/UserModel.js';

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

//FUNGSI LOGIN
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({
            where: { username }
        });

        if (user) {
            const userPlain = user.toJSON();

            const { password: _, refreshToken, ...safeUserData } = userPlain;
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const accessToken = jwt.sign(
                    safeUserData,
                    process.env.ACCESS_TOKEN_SECRET, 
                    { expiresIn: '15m' }
                );
                const refreshToken = jwt.sign(
                    safeUserData,
                    process.env.REFRESH_TOKEN_SECRET, 
                    { expiresIn: '7d' }
                );

                await User.update(
                { refresh_token: refreshToken }, 
                { where: { id: user.id } });


                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    maxAge: 24  * 60 * 60 * 1000, //1day
                    secure: true,
                });

                res.status(200).json({
                    status: 'success',
                    message: 'Login successful',
                    data: safeUserData,
                    accessToken,
                });
            } else {
                const error = new Error('Username or password is incorrect');
                error.statusCode = 400;
                throw error;
            }
        } else {
            const error = new Error('Username or password is incorrect');
            error.statusCode = 400;
            throw error;
        }
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            status: 'Error',
            message: error.message,
        });
    }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const error = new Error('Refresh token tidak ada');
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findOne({
      where: { refresh_token: refreshToken },  // pakai refresh_token sesuai DB
    });

    if (!user) {
      const error = new Error('User tidak ditemukan');
      error.statusCode = 401;
      throw error;
    }

    // Reset refresh_token ke null di DB
    await User.update(
      { refresh_token: null },
      { where: { id: user.id } }
    );

    res.clearCookie('refreshToken');

    res.status(200).json({
      status: 'success',
      message: 'Logout successful',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'Error',
      message: error.message,
    });
  }
};


// Fungsi registrasi user baru
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // cek apakah username atau email sudah terdaftar
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user baru
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User berhasil didaftarkan' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
