// import userModel from "../models/userModel.js";
// import FormData from "form-data";
// import axios from "axios";

// export const generateImage = async (req, res) => {
//     try{
//         const {userId, prompt} = req.body;

//         console.log("Request received:", {userId, prompt}); // Debug log

//         const user = await userModel.findById(userId);

//         console.log("User found:", user ? "Yes" : "No"); // Debug log

//         if(!user || !prompt){
//             return res.json({success: false, message: 'Missing Details of User'})
//         }

//         if(user.creditBalance <= 0){
//             return res.json({success: false, message: 'Insufficient Credits. Please Subscribe !', creditBalance: user.creditBalance})
//         }

//         const formData = new FormData();
//         formData.append('prompt', prompt); 


//         console.log("Calling API with key:", process.env.CLIPDROP_API?.substring(0, 10) + "..."); // Log partial key for security

//         const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
//             // method: 'POST',
//               headers: {
//               'x-api-key': process.env.CLIPDROP_API, // API key for authentication
//               'Content-Type': 'multipart/form-data',
//               ...formData.getHeaders(), // Include headers from FormData
//             },
//             responseType: 'arraybuffer', 
//     })

//     console.log("API response received, status:", data);

//     const base64Image = Buffer.from(data, 'binary').toString('base64'); // Convert binary data to base64
//     //What is Base64? Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation.
    
//     const resultImage = `data:image/png;base64,${base64Image}`; // Prepend the base64 string with the appropriate data URL prefix
//     //what is data URL? A data URL is a base64-encoded string that represents the content of a file, allowing it to be embedded directly in HTML or CSS.
//     //This is useful for embedding images or other media directly into web pages without needing to host them separately.
//     //the data URL prefix specifies the media type and encoding of the data, allowing browsers to interpret it correctly.
//     //In this case, it indicates that the data is a PNG image encoded in base64.

//     await userModel.findByIdAndUpdate(user._id ,{creditBalance:user.creditBalance -1})
//     res.json({success:true, message:"Image Generated !", 
//     creditBalance: user.creditBalance-1, resultImage });

//     }catch(error){
//         console.error("Full error:", error);
//         console.error("Response details:", error.response?.status, error.response?.statusText);
//         // console.log(error)
//         res.json({success: false, message: error.message});
//     }

// }

import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

// Helper function to implement retry logic
const makeRequestWithRetry = async (url, formData, config, maxRetries = 3) => {
  let lastError = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`API request attempt ${attempt}/${maxRetries}`);
      return await axios.post(url, formData, {
        ...config,
        timeout: 30000, // 30 second timeout
      });
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      lastError = error;
      
      // If we've reached max retries, throw the error
      if (attempt === maxRetries) break;
      
      // Wait longer between each retry
      const delay = attempt * 2000;
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

export const generateImage = async (req, res) => {
  try {
    const {userId, prompt} = req.body;
    
    console.log("Request received:", {userId, prompt});
    
    const user = await userModel.findById(userId);
    
    console.log("User found:", user ? "Yes" : "No");
    
    if(!user || !prompt) {
      return res.json({success: false, message: 'Missing Details of User'});
    }
    
    if(user.creditBalance <= 0) {
      return res.json({
        success: false, 
        message: 'Insufficient Credits. Please Subscribe!', 
        creditBalance: user.creditBalance
      });
    }
    
    const formData = new FormData();
    formData.append('prompt', prompt);
    
    const config = {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
        'Content-Type': 'multipart/form-data',
        ...formData.getHeaders()
      },
      responseType: 'arraybuffer'
    };
    
    console.log("Making API request to ClipDrop...");
    
    try {
      const {data} = await makeRequestWithRetry(
        'https://clipdrop-api.co/text-to-image/v1',
        formData,
        config
      );
      
      console.log("API request successful, processing response...");
      
      const base64Image = Buffer.from(data, 'binary').toString('base64');
      const resultImage = `data:image/png;base64,${base64Image}`;
      
      // Reduce credit balance
      await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1});
      
      return res.json({
        success: true, 
        message: "Image Generated!", 
        creditBalance: user.creditBalance - 1, 
        resultImage
      });
    } catch (apiError) {
      console.error("API Error:", apiError.message);
      return res.json({
        success: false, 
        message: "Failed to generate image with ClipDrop API. Please try again.",
        error: apiError.message
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false, 
      message: "Server error while processing your request",
      error: error.message
    });
  }
};