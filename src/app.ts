import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import errorHandler from './middleware/error';
import universityRouter from './routes/University';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(universityRouter);
app.use(errorHandler);

export default app;