const express = require('express');
require('express-async-errors');
const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use(cors);

app.use(routes);
app.use(errorHandler);

app.listen(5151, () => {
  console.log('🔥 Server is running on port 5151');
});
