 // import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     // console.log(req);
//     const authHeader = req.headers.authorization;
//     // console.log(req.headers);
//     // console.log(req.headers.authorisation);
//     // console.log(req.headers.authorization);
//     console.log(authHeader);
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.json({ success: false, message: 'No Authorized Login Again' });
//     }

//     const token = authHeader.split(' ')[1]; // Split and get the token part

//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//         if (token_decode.id) {
//             req.body.userId = token_decode.id; // You can attach to req.body OR req.userId
//         } else {
//             return res.json({ success: false, message: 'No Authorized Login Again' });
//         }

//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// export default authUser;

//---------------------------------------

// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     // Check for token in multiple possible locations
//     const token = 
//         req.headers.authorization?.split(' ')[1] || // Check standard Authorization header
//         req.headers.token || // Check custom token header
//         req.query.token; // Also check query params if needed
    
//     if (!token) {
//         return res.status(401).json({ success: false, message: 'No token provided. Login again.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         if (decoded.id) {
//             // Attach user ID to request for use in route handlers
//             req.userId = decoded.id;
//         } else {
//             return res.status(401).json({ success: false, message: 'Invalid token. Login again.' });
//         }

//         next();
//     } catch (error) {
//         console.log('Auth error:', error.message);
//         return res.status(401).json({ success: false, message: 'Token verification failed' });
//     }
// };

// export default authUser;

//------------------------------------------------

// 

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        // Get token from header with better extraction
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authentication token missing' });
        }

        const token = authHeader.split(' ')[1];
        
        // Verify the token with explicit error handling
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            if (!decoded.id) {
                return res.status(401).json({ success: false, message: 'Invalid token format' });
            }
            
            // Set the user ID correctly
            req.userId = decoded.id;
            next();
        } catch (jwtError) {
            console.error('JWT verification error:', jwtError);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ success: false, message: 'Authentication error' });
    }
};

export default authUser;