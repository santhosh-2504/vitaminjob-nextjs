import { serialize } from 'cookie';

export const sendToken = (user, statusCode, res, message) => {
    try {
        const token = user.getJWTToken();
        
        // Use consistent cookie options
        const cookieOptions = {
            expires: new Date(
                Date.now() + (parseInt(process.env.COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Changed to lax for development
            path: '/'
        };

        // Use serialize for consistent cookie formatting
        const serializedCookie = serialize('token', token, cookieOptions);
        res.setHeader('Set-Cookie', serializedCookie);
        
        res.status(statusCode).json({
            success: true,
            user,
            message
        });
    } catch (error) {
        console.error('Token Error:', error);
        throw error; // Let the error middleware handle it
    }
};