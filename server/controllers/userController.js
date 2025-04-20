import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const registerUser = async(req, res) => {
    try{
        const{name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success: false, message: 'Please Fill All Fields'})
        }
        if(!validator.isEmail(email)){
            return res.json({success: false, message: 'Please Enter Valid Email'})
        }
        if(password.length < 8){
            return res.json({success: false, message: 'Please Enter Strong Password'})
        }

        const salt = await bcrypt.genSalt(10);          //This function generates a "salt," which is a random string of characters used to make password hashing more secure.
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashPassword,
        }

        const newUser = userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

        res.json({success: true, token, user:{name: user.name}})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message: 'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
            res.json({success: true, token})
        }else{
            return res.json({success: false, message: 'Invalid Credentials'})
        }
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//------------CREDITSSS------------

const userCredits = async (req, res) => {
    try {
        const userId = req.userId;  // middleware already added this
        if (!userId) {
            return res.json({ success: false, message: "No User ID Provided" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        res.json({
            success: true,
            credits: user.creditBalance || 5 ,  // (in case it's undefined initially)
            user: { name: user.name }
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

     

export {registerUser, loginUser, userCredits}; 