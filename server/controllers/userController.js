// import userModel from "../models/userModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import validator from "validator";

// const registerUser = async(req, res) => {
//     try{
//         const{name, email, password} = req.body;
//         if(!name || !email || !password){
//             return res.json({success: false, message: 'Please Fill All Fields'})
//         }
//         if(!validator.isEmail(email)){
//             return res.json({success: false, message: 'Please Enter Valid Email'})
//         }
//         if(password.length < 8){
//             return res.json({success: false, message: 'Please Enter Strong Password'})
//         }

//         const salt = await bcrypt.genSalt(10);          //This function generates a "salt," which is a random string of characters used to make password hashing more secure.
//         const hashPassword = await bcrypt.hash(password, salt);

//         const userData = {
//             name,
//             email,
//             password: hashPassword,
//         }

//         const newUser = userModel(userData);
//         const user = await newUser.save();

//         const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

//         res.json({success: true, token, user:{name: user.name}})
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// const loginUser = async(req, res) => {
//     try{
//         const {email, password} = req.body;
//         const user = await userModel.findOne({email})

//         if(!user){
//             return res.json({success: false, message: 'Invalid Credentials'})
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if(isMatch){
//             const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
//             // Add user object to match registration response format
//             res.json({success: true, token, user: {name: user.name}})
//         }else{
//             return res.json({success: false, message: 'Invalid Credentials'})
//         }
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// //------------CREDITSSS------------

// const userCredits = async (req, res) => {
//     try {
//         const userId = req.userId;
        
//         if (!userId) {
//             return res.status(400).json({ success: false, message: "No User ID Provided" });
//         }

//         console.log("Looking for user with ID:", userId);
        
//         try {
//             const user = await userModel.findById(userId);
            
//             if (!user) {
//                 return res.status(404).json({ success: false, message: "User Not Found" });
//             }
            
//             return res.json({
//                 success: true,
//                 credits: user.creditBalance || 5,
//                 user: { 
//                     name: user.name,
//                     _id: user._id // Important to include ID for client requests
//                 }
//             });
//         } catch (dbError) {
//             console.error("Database error:", dbError);
//             return res.status(500).json({ success: false, message: "Database error" });
//         }
//     } catch (error) {
//         console.error("User credits error:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };
     

// export {registerUser, loginUser, userCredits}; 

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

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({success: false, message: 'Email already registered'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashPassword,
        }

        const newUser = userModel(userData);
        const user = await newUser.save();

        // Use _id instead of id for MongoDB
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.json({
            success: true, 
            token, 
            user: {
                name: user.name,
                _id: user._id
            }
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({success: false, message: error.message})
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
            // Use _id instead of id for MongoDB
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            
            res.json({
                success: true, 
                token, 
                user: {
                    name: user.name,
                    _id: user._id
                }
            });
        }else{
            return res.json({success: false, message: 'Invalid Credentials'})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const userCredits = async (req, res) => {
    try {
        const userId = req.userId;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "No User ID Provided" });
        }

        console.log("Looking for user with ID:", userId);
        
        try {
            const user = await userModel.findById(userId);
            
            if (!user) {
                return res.status(404).json({ success: false, message: "User Not Found" });
            }
            
            return res.json({
                success: true,
                credits: user.creditBalance || 5,
                user: { 
                    name: user.name,
                    _id: user._id
                }
            });
        } catch (dbError) {
            console.error("Database error:", dbError);
            return res.status(500).json({ success: false, message: "Database error" });
        }
    } catch (error) {
        console.error("User credits error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export {registerUser, loginUser, userCredits};