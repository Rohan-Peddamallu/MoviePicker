import express from 'express'; 
import router from './routes/users';
import cors from 'cors';
import SessionConfig from './config/session';
import session from 'express-session';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(cors({ origin: 'http://localhost:5173', methods: 'GET,POST,PUT,DELETE', credentials: true }));
app.use(express.json());

app.use('/api/users', router)
app.use(session(SessionConfig));

app.use((req, res, next) => {
  next({ statusCode: 404, message: 'Not found' });
});

app.use(errorHandler);

export default app;