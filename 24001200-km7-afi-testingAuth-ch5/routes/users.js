const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// // Tambahkan user baru beserta profilnya
// router.post('/users', async (req, res) => {
//   const { name, email, password, profile } = req.body;
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password,
//         profile: {
//           create: {
//             identity_type: profile.identity_type,
//             identity_number: profile.identity_number,
//             address: profile.address,
//           },
//         },
//       },
//     });
//     res.json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Mendapatkan daftar semua users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({ include: { profile: false } });
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// // Mendapatkan detail user berdasarkan ID
// router.get('/users/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: Number(userId) },
//       include: { profile: true },
//     });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching user' });
//   }
// });

// // Update user berdasarkan ID
// router.put('/users/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { name, email, password } = req.body;
//   try {
//     const updatedUser = await prisma.user.update({
//       where: { id: Number(userId) },
//       data: { name, email, password },
//     });
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating user' });
//   }
// });





// for testing:
const UserControllers = require('../controllers/userControllers');
router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUsers);
router.get('/users/:userId', UserControllers.getUserById);
router.put('/users/:userId', UserControllers.updateUser);



module.exports = router;
