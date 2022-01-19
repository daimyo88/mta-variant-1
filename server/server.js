const express = require('express');
const cookieParser = require("cookie-parser");
var cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const router = require('./routes');

const errorLogger = require('./loggers/error-logger');

const app = express();

app.use(express.json({limit: '50mb'}));

app.use(cookieParser());

const corsOptions = {
  origin: JSON.parse(process.env.ALLOWED_ORIGINS),
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions));

app.use('/api/auth', router.authRoutes);
app.use('/api/users', router.userRoutes);
app.use('/api/transports', router.transportsRoutes);
app.use('/api/locations', router.locationsRoutes);
app.use('/api/data-entries', router.dataEntriesRoutes);
app.use('/api/stats', router.statsRoutes);

app.use((error, req, res, next) => {

  if(res.headerSent) {
    return next(error);
  }

  if(error.location) {
    errorLogger.error(`${error} Location: ${error.location}`);
  }

  if(error.code === 401) {
    res.clearCookie("mta1_token");
    res.status(error.code);
    res.json({ message: error.message});
  } else {
    res.status(error.code || 500);
    res.json({ message: error.message || 'unknown-error' });
  }
});

mongoose
  .connect(
    process.env.DB_CONNECTION,
    { 
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    },
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log('server started')
    console.log('mode:' + process.env.NODE_ENV)
  })
  .catch(err => {
    console.log(err);
  }); 