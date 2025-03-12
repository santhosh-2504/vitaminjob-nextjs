import dbConnect from '@/lib/dbConnect';
import { User } from '@/lib/models/User';
import { catchAsync } from '@/lib/middlewares/catchAsync';
import jwt from 'jsonwebtoken';

export default catchAsync(async (req, res) => {
    if (req.method !== 'DELETE') {
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Get user with password
        const user = await User.findById(decoded._id).select('+password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const { password } = req.body;

        // Check if password is provided
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please provide your password"
            });
        }

        // Verify password
        const isPasswordMatched = await user.comparePassword(password);
        
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            });
        }

        // Delete user
        await User.findByIdAndDelete(user._id);

        // Clear the token cookie
        res.setHeader(
            'Set-Cookie',
            'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly'
        );

        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });

    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Error deleting account"
        });
    }
});