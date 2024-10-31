const request = require('supertest');
const app = require('../app');

describe('Account Endpoints', () => {
  let accountId;
  const userId = 1;

  it('should create a new bank account for a user', async () => {
    const res = await request(app)
      .post('/api/v1/accounts')
      .send({
        userId: userId,
        bank_name: 'Bank BCA',
        bank_account_number: '21321321',
        balance: 100000000,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('userId', userId);
    expect(res.body).toHaveProperty('bank_name', 'Bank BCA');
    expect(res.body).toHaveProperty('bank_account_number', '21321321')
    accountId = res.body.id;
  });

  it('should fetch all bank accounts', async () => {
    const res = await request(app).get('/api/v1/accounts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should fetch all bank accounts by user ID', async () => {
    const res = await request(app).get(`/api/v1/accounts/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('userId', userId);
    }
  });


  // ----- Failure Cases ------


  it('should not create a new bank account if bank account number is already taken', async () => {
    const res = await request(app)
      .post('/api/v1/accounts')
      .send({
        userId: userId,
        bank_name: 'Bank BCA',
        bank_account_number: '"213213"', // example of duplicate number
        balance: 100000000,
      });

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error', 'Account number already exists');
  });


});
