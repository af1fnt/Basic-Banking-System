const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// // Tambahkan akun bank baru ke user yang sudah ada
// router.post('/accounts', async (req, res) => {
//   const { userId, bank_name, bank_account_number, balance } = req.body;
//   try {
//     const newAccount = await prisma.bankAccount.create({
//       data: {
//         userId,
//         bank_name,
//         bank_account_number,
//         balance,
//       },
//     });
//     res.json(newAccount);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating account' });
//   }
// });

// // Mendapatkan daftar semua akun
// router.get('/accounts', async (req, res) => {
//   try {
//     const accounts = await prisma.bankAccount.findMany();
//     res.json(accounts);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching accounts' });
//   }
// });

// // Mendapatkan semua akun bank berdasarkan userId
// router.get('/accounts/user/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const accounts = await prisma.bankAccount.findMany({ where: { userId: Number(userId) } });
//     if (!accounts || accounts.length === 0) {
//       return res.status(404).json({ error: 'No accounts found for this user' });
//     }
//     res.json(accounts);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching accounts' });
//   }
// });




// for testing:
const AccountControllers = require('../controllers/accountControllers');
router.post('/accounts', AccountControllers.createAccount);
router.get('/accounts', AccountControllers.getAllAccounts);
router.get('/accounts/user/:userId', AccountControllers.getAccountsByUserId);



module.exports = router;
