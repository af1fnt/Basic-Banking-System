const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AccountControllers {
  static async createAccount(req, res) {
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
      res.status(201).json(newAccount);
    } catch (error) {
      res.status(500).json({ error: 'Error creating account' });
    }
  }

  static async getAllAccounts(req, res) {
    try {
      const accounts = await prisma.bankAccount.findMany();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching accounts' });
    }
  }

  static async getAccountsByUserId(req, res) {
    const { userId } = req.params;
    try {
      const accounts = await prisma.bankAccount.findMany({ where: { userId: Number(userId) } });
      if (!accounts || accounts.length === 0) {
        return res.status(404).json({ error: 'No accounts found for this user' });
      }
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching accounts' });
    }
  }
}

module.exports = AccountControllers;
