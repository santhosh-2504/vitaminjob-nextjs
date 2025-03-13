import { serialize } from 'cookie';

export const sendToken = (user, statusCode, res, message) => {
    try {
        const token = user.getJWTToken();
        
        const cookieOptions = {
            expires: new Date(
                Date.now() + (parseInt(process.env.COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Only secure in production (HTTPS)
            sameSite: 'lax', // Allows cookies for API calls from the same domain
            path: '/', // Accessible site-wide
        };

        // Set the cookie in API route response
        res.setHeader('Set-Cookie', serialize('token', token, cookieOptions));
        
        res.status(statusCode).json({
            success: true,
            user,
            message
        });
    } catch (error) {
        console.error('Token Error:', error);
        throw error;
    }
};
