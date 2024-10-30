const request = require('supertest');
const app = require('../app');

describe('User Endpoints', () => {
  let userId;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'afif',
        email: 'afif@gmail.com',
        password: 'password123',
        profile: {
          identity_type: 'KTP',
          identity_number: '21431',
          address: 'Jl. Sudirman No. 6',
        },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('should fetch all users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should fetch a user by ID', async () => {
    const res = await request(app).get(`/api/v1/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('should update a user by ID', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send({
        name: 'dwqo',
        email: 'klsadmlas[@example.com',
        password: 'newpassword123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'dwqo');
  });

  // ----- Failure Cases -----

  it('should not create a new user if email is already taken', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Duplicate User',
        email: 'john@example.com',
        password: 'anotherpassword',
        profile: {
          identity_type: 'KTP',
          identity_number: '9876543210',
          address: 'Jl. Mangga Dua No. 2',
        },
      });

    expect(res.statusCode).toBe(400); 
    expect(res.body).toHaveProperty('error', 'Email already exists');
  });

  it('should not create a new user if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        name: '',
        email: '',
        password: '',
        profile: {
          identity_type: '',
          identity_number: '',
          address: '',
        },
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Required fields are missing');
  });

  it('should not update a user if user ID is invalid', async () => {
    const invalidUserId = 9999;
    const res = await request(app)
      .put(`/api/v1/users/${invalidUserId}`)
      .send({
        name: 'Invalid User',
        email: 'invalid@example.com',
        password: 'invalidpassword',
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });
});
