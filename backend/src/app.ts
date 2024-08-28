import express from 'express'; 
import router from './routes/users';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173', methods: 'GET,POST,PUT,DELETE', credentials: true }));
app.use(express.json());

app.use('/api/users', router);

export default app;