import express from 'express';
import { loginUser, registerUser, userCredits } from '../controllers/userController.js'; // Import the loginUser function
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser); // Add this line to include the registerUser route
userRouter.post('/login', loginUser); // Add this line to include the loginUser route
userRouter.get('/credit', authUser, userCredits); // Add this line to include the userCredits route

export default userRouter;
