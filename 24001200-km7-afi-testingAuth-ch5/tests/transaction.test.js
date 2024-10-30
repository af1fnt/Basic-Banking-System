const request = require('supertest');
const app = require('../app');

describe('Transaction Endpoints', () => {
  let transactionId;
  const sourceAccountId = 1;
  const destinationAccountId = 2;

  it('should create a new transaction between two accounts', async () => {
    const res = await request(app)
      .post('/api/v1/transactions')
      .send({
        sourceAccountId: sourceAccountId,
        destinationAccountId: destinationAccountId,
        amount: 200,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('sourceAccountId', sourceAccountId);
    expect(res.body).toHaveProperty('destinationAccountId', destinationAccountId);
    transactionId = res.body.id;
  });

  it('should fetch all transactions', async () => {
    const res = await request(app).get('/api/v1/transactions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should fetch a transaction by ID', async () => {
    const res = await request(app).get(`/api/v1/transactions/${transactionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', transactionId);
  });
});
