import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { authenticateUser } from './middleware/authMiddleware.js';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// router imports
import authRouter from './routes/auth.js';
import taskRouter from './routes/tasks.js';
import userRouter from './routes/user.js';

//dirName

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const port = process.env.PORT || 5100;
const __dirname = dirname(fileURLToPath(import.meta.url));

// security
app.use(helmet());
app.use(mongoSanitize());

// Middlewares
import errorMiddleWare from './middleware/errorMiddleware.js';

if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cookieParser());
app.use(express.json());

// routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/task', authenticateUser, taskRouter);
app.use('/api/v1/user', authenticateUser, userRouter);

// frontend routes
app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

// 404 page not found
app.use('*', (req, res, next) => {
  res.send('404. Page Not Found');
});

// Error Route
app.use(errorMiddleWare);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log('sever Started!');
  });
} catch (error) {
  console.log(error);
  console.log('Server Initiation Failed!');
  process.exit();
}
