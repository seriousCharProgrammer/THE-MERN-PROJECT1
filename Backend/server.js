const express = require('express');
const dotenv = require('dotenv');
const hpp = require('hpp');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./Middleware/error');
const userRoute = require('./Route/userRoutes');
const ticketroute = require('./Route/TicketRoutes');
const asyncHandler = require('express-async-handler');
const connectdb = require('./DB');
dotenv.config({ path: './Backend/config.env' });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectdb();
const PORT = process.env.PORT;

app.use('/api/users', userRoute);
app.use('/api/tickets', ticketroute);
app.use(errorHandler);
const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  server.close(() => {
    process.exit(1);
  });
});
