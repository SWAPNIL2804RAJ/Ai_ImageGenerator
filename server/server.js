
import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRouter.js';

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
await connectDB();


app.use('/api/user', userRouter)
app.use('/api/image', imageRouter )
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(port, () => console.log(`Server is running on Port: ${port}`));