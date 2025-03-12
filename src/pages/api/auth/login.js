import dbConnect from '@/lib/dbConnect';
import { User } from '@/lib/models/User';
import { sendToken } from '@/utils/jwtToken';

export default async function handler(req, res) {
    try {
        // Connect to database
        await dbConnect();

        if (req.method !== 'POST') {
            return res.status(405).json({
                success: false,
                message: 'Method not allowed'
            });
        }

        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: 'Please enter email and password'
            });
        }

        // Get user with password
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if password matches
        const isPasswordMatched = await user.comparePassword(password);
        
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Use sendToken utility to handle token generation and response
        sendToken(user, 200, res, 'Logged in successfully');

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}