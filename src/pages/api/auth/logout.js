import { catchAsync } from '@/lib/middlewares/catchAsync';
import { serialize } from 'cookie';

export default catchAsync(async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        // Clear the token cookie by setting it to expire immediately
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            path: '/',
            expires: new Date(0) // Set expiration to past date to clear the cookie
        };

        // Set cookie header to clear the token
        res.setHeader('Set-Cookie', serialize('token', '', cookieOptions));

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error logging out'
        });
    }
});
