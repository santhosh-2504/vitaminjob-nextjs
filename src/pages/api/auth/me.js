import dbConnect from '@/lib/dbConnect';
import { User } from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { catchAsync } from '@/lib/middlewares/catchAsync';

// Add validation for required environment variables
if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY must be defined in environment variables');
}

export default catchAsync(async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        // Get token from cookies
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            algorithms: ['HS256']
        });
        
        // Get user details
        const user = await User.findById(decoded._id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error('Get user error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})
