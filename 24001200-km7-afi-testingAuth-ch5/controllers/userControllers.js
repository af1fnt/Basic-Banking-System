const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserControllers {
  // Membuat pengguna baru
  static async createUser(req, res) {
    const { name, email, password, profile } = req.body;
    try {
      // Cek apakah email sudah ada
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Validasi input
      if (!name || !email || !password || !profile || !profile.identity_type || !profile.identity_number || !profile.address) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      // Buat pengguna baru
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          profile: {
            create: {
              identity_type: profile.identity_type,
              identity_number: profile.identity_number,
              address: profile.address,
            },
          },
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  // Mendapatkan semua pengguna
  static async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany({ include: { profile: true } });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
    }
  }

  // Mendapatkan pengguna berdasarkan ID
  static async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
        include: { profile: true },
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
  }

  // Mengupdate pengguna berdasarkan ID
  static async updateUser(req, res) {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    try {
      // Cek apakah pengguna ada
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Cek apakah email sudah ada (jika diperbarui)
      if (email && email !== user.email) {
        const emailExists = await prisma.user.findUnique({ where: { email } });
        if (emailExists) {
          return res.status(400).json({ error: 'Email already exists' });
        }
      }

      // Perbarui pengguna
      const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: { name, email, password },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  }
}

module.exports = UserControllers;
