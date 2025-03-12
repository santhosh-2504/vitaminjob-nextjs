import dbConnect from '@/lib/dbConnect';
import { User } from '@/lib/models/User';
import { catchAsync } from '@/lib/middlewares/catchAsync';
import jwt from 'jsonwebtoken';

export default catchAsync(async (req, res) => {
    if (req.method !== 'PUT') {
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
        
        // Get user
        const user = await User.findById(decoded._id).select('+password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const { oldPassword, newPassword } = req.body;

        // Check if all fields are provided
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide all password fields"
            });
        }

        // Check if old password is correct
        const isPasswordMatched = await user.comparePassword(oldPassword);
        
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Error updating password"
        });
    }
});

// Configure API to handle larger payloads if needed
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb'
        }
    }
}