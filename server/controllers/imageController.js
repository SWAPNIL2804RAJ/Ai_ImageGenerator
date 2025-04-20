import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
    try{
        const {userId, prompt} = req.body;

        console.log("Request received:", {userId, prompt}); // Debug log

        const user = await userModel.findById(userId);

        console.log("User found:", user ? "Yes" : "No"); // Debug log

        if(!user || !prompt){
            return res.json({success: false, message: 'Missing Details of User'})
        }

        if(user.creditBalance <= 0){
            return res.json({success: false, message: 'Insufficient Credits. Please Subscribe !', creditBalance: user.creditBalance})
        }

        const formData = new FormData();
        formData.append('prompt', prompt); 


        console.log("Calling API with key:", process.env.CLIPDROP_API?.substring(0, 10) + "..."); // Log partial key for security

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            // method: 'POST',
              headers: {
              'x-api-key': process.env.CLIPDROP_API, // API key for authentication
              'Content-Type': 'multipart/form-data',
              ...formData.getHeaders(), // Include headers from FormData
            },
            responseType: 'arraybuffer', 
    })

    console.log("API response received, status:", data);

    const base64Image = Buffer.from(data, 'binary').toString('base64'); // Convert binary data to base64
    //What is Base64? Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation.
    
    const resultImage = `data:image/png;base64,${base64Image}`; // Prepend the base64 string with the appropriate data URL prefix
    //what is data URL? A data URL is a base64-encoded string that represents the content of a file, allowing it to be embedded directly in HTML or CSS.
    //This is useful for embedding images or other media directly into web pages without needing to host them separately.
    //the data URL prefix specifies the media type and encoding of the data, allowing browsers to interpret it correctly.
    //In this case, it indicates that the data is a PNG image encoded in base64.

    await userModel.findByIdAndUpdate(user._id ,{creditBalance:user.creditBalance -1})
    res.json({success:true, message:"Image Generated !", 
    creditBalance: user.creditBalance-1, resultImage });

    }catch(error){
        console.error("Full error:", error);
        console.error("Response details:", error.response?.status, error.response?.statusText);
        // console.log(error)
        res.json({success: false, message: error.message});
    }

}