const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TransactionControllers {
  static async createTransaction(req, res) {
    const { sourceAccountId, destinationAccountId, amount } = req.body;
    try {
      const sourceAccount = await prisma.bankAccount.findUnique({ where: { id: sourceAccountId } });
      const destinationAccount = await prisma.bankAccount.findUnique({ where: { id: destinationAccountId } });

      if (!sourceAccount || !destinationAccount) {
        return res.status(404).json({ error: 'Source or destination account not found' });
      }

      const transaction = await prisma.transaction.create({
        data: {
          sourceAccountId,
          destinationAccountId,
          amount,
        },
      });

      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Error creating transaction' });
    }
  }

  static async getAllTransactions(req, res) {
    try {
      const transactions = await prisma.transaction.findMany();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching transactions' });
    }
  }

  static async getTransactionById(req, res) {
    const { transactionId } = req.params;
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id: Number(transactionId) },
      });

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching transaction' });
    }
  }
}

module.exports = TransactionControllers;
