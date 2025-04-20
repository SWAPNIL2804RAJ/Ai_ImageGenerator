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
        // Get token from header - check both standard and custom formats
        const token = req.headers.token || 
                     (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
                      ? req.headers.authorization.split(' ')[1] : null);
        
        console.log('Headers received:', req.headers); // Log all headers for debugging
        console.log('Token extracted:', token ? 'Yes' : 'No'); // Debug logging
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication token missing' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded && decoded.id) {
            // Set the user ID on both req.userId and req.body.userId for compatibility
            req.userId = decoded.id;
            req.body.userId = decoded.id;
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Invalid token format' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }
        
        return res.status(500).json({ success: false, message: 'Authentication error' });
    }
};

export default authUser;