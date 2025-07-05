import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export default class UserController {
    async signup(req, res, next) {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({success: false, message: 'All fields are required' });
        }

        try {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }],
                },
            });

            if (existingUser) {
                return res.status(409).json({ success: false, message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            res.status(201).json({success: true, message: 'User created successfully', userId: newUser.id });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({success: false, message: 'Username and password are required' });
        }

        try {
            const user = await prisma.user.findUnique({
                where: { username },
            });

            if (!user) {
                return res.status(404).json({success: false, message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({success: false, message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
                expiresIn: '7d',
            });

            res.json({success: true, message: 'Login successful', token });
        } catch (err) {
            next(err);
        }
    }
}
