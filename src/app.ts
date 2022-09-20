import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/error';
import universityRouter from './routes/University';

const app = express();
app.use(express.json());
app.use(universityRouter);
app.use(errorHandler);

export default app;