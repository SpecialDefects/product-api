import express from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { signin, createNewUser } from './handlers/users';

const app = express();

// add middle ware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.status(200);
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

export default app;