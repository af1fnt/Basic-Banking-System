const express = require('express');
const bodyParser = require('body-parser');

const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(bodyParser.json());


// Tambahkan user baru beserta profilnya
app.post('/api/v1/users', async (req, res) => {
  const { name, email, password, profile } = req.body;
    try {
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
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
});
  
// Mendapatkan daftar semua users
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { profile: false },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});
  
// Mendapatkan detail user berdasarkan ID
app.get('/api/v1/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { profile: true },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Update user berdasarkan ID
app.put('/api/v1/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name,
        email,
        password,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Tambahkan akun bank baru ke user yang sudah ada
app.post('/api/v1/accounts', async (req, res) => {
  const { userId, bank_name, bank_account_number, balance } = req.body;
  try {
    const newAccount = await prisma.bankAccount.create({
      data: {
        userId,
        bank_name,
        bank_account_number,
        balance,
      },
    });
    res.json(newAccount);
  } catch (error) {
    res.status(500).json({ error: 'Error creating account' });
  }
});
  
// Mendapatkan daftar semua akun
app.get('/api/v1/accounts', async (req, res) => {
  try {
    const accounts = await prisma.bankAccount.findMany();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching accounts' });
  }
});

// Mendapatkan semua akun bank berdasarkan userId
app.get('/api/v1/accounts/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const accounts = await prisma.bankAccount.findMany({
      where: { userId: Number(userId) },
      include: {
        user: true,  // Mengambil informasi pemilik akun (User)
      },
    });

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ error: 'No accounts found for this user' });
    }

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching accounts' });
  }
});

// Mengirimkan uang dari satu akun ke akun lain
app.post('/api/v1/transactions', async (req, res) => {
  const { sourceAccountId, destinationAccountId, amount } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: {
        sourceAccountId,
        destinationAccountId,
        amount,
      },
    });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error creating transaction' });
  }
});
  
// Mendapatkan daftar semua transaksi
app.get('/api/v1/transactions', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

// Mendapatkan detail transaksi berdasarkan ID
app.get('/api/v1/transactions/:transactionId', async (req, res) => {
    const { transactionId } = req.params;
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id: Number(transactionId) },
        include: {
          sourceAccount: true,
          destinationAccount: true,
        },
      });
  
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
  
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching transaction' });
    }
  });
  


app.listen(port, () => {console.log(`Server running on http://localhost:${port}`);});