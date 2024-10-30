const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const port = 3000;

const app = express();
app.use(bodyParser.json());

const swaggerDocument = YAML.load('./docs/swagger.yml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRoutes = require('./routes/users');
const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');

app.use('/api/v1', userRoutes);
app.use('/api/v1', accountRoutes);
app.use('/api/v1', transactionRoutes);
app.use('/api/v1', authRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;