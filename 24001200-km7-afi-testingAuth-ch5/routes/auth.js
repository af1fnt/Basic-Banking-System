const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddlewares')

// Rute untuk register
router.post('/auth/register', AuthControllers.register);

// Rute untuk login
router.post('/auth/login', AuthControllers.login);

// Rute untuk autentikasi token
router.get('/auth/authenticate', AuthControllers.authenticate);

/**
 * @swagger
 * /api/v1/auth/authenticate:
 *   get:
 *     summary: Authenticate token
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Unauthorized
 */
router.get('/authenticate', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
  });
  

module.exports = router;
