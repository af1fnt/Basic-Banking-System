const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET_KEY = 'qwerty';

class AuthControllers {
  static async register(req, res) {
    const { name, email, password } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  // Login user
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }

  // Autentikasi token
  static async authenticate(req, res) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
      console.error('Error during authentication:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
  }
}

module.exports = AuthControllers;
