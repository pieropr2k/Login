import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { createAccessToken } from '../libs/jwt.js';
import { findUserByEmail, createUser , findUserById } from '../models/user.model.js';

export const register = async (req, res) => {
    //console.log(req.body);
    const { full_name, email, password, role_id } = req.body;

    try {
        const userFound = await findUserByEmail(email);
        if (userFound) return res.status(400).json({ message: "The email is already in use" });

        const passwordHash = await bcrypt.hash(password, 10);
        const userId = await createUser({ full_name, email, password: passwordHash , role_id});

        const token = await createAccessToken({ id: userId });
        //console.log(token);
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });
        res.json({ id: userId, full_name, email, role_id, token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password, "login");

    try {
        const userFound = await findUserByEmail(email);
        if (!userFound) return res.status(400).json({ message: "The email does not exist" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "The password is incorrect" });

        const token = await createAccessToken({ id: userFound.id });
        //console.log(token, "token");

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        //console.log(token)

        res.json({ id: userFound.id, username: userFound.username, email: userFound.email, role_id: userFound.role_id, token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const userFound = await findUserById(decoded.id);
        if (!userFound) return res.sendStatus(401);

        res.json({ id: userFound.id, full_name: userFound.full_name, email: userFound.email, role_id: userFound.role_id});
    } catch (err) {
        return res.sendStatus(401);
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    return res.sendStatus(200);
};