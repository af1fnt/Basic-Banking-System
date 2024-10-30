const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();


// // Mengirimkan uang dari satu akun ke akun lain
// router.post('/transactions', async (req, res) => {
//   const { sourceAccountId, destinationAccountId, amount } = req.body;
//   try {
//     const sourceAccount = await prisma.bankAccount.findUnique({ where: { id: sourceAccountId } });
//     const destinationAccount = await prisma.bankAccount.findUnique({ where: { id: destinationAccountId } });

//     if (!sourceAccount || !destinationAccount) {
//       return res.status(404).json({ error: 'Source or destination account not found' });
//     }

//     const transaction = await prisma.transaction.create({
//       data: { sourceAccountId, destinationAccountId, amount },
//     });

//     res.json(transaction);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating transaction' });
//   }
// });

// // Mendapatkan daftar semua transaksi
// router.get('/transactions', async (req, res) => {
//   try {
//     const transactions = await prisma.transaction.findMany();
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching transactions' });
//   }
// });

// // Mendapatkan detail transaksi berdasarkan ID
// router.get('/transactions/:transactionId', async (req, res) => {
//   const { transactionId } = req.params;
//   try {
//     const transaction = await prisma.transaction.findUnique({ where: { id: Number(transactionId) } });
//     if (!transaction) {
//       return res.status(404).json({ error: 'Transaction not found' });
//     }
//     res.json(transaction);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching transaction' });
//   }
// });


// for testing:
const TransactionControllers = require('../controllers/transactionControllers');
router.post('/transactions', TransactionControllers.createTransaction);
router.get('/transactions', TransactionControllers.getAllTransactions);
router.get('/transactions/:transactionId', TransactionControllers.getTransactionById);


module.exports = router;
