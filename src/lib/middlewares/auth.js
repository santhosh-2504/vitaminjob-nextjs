import { User } from "@/models/User.js";
import { catchAsync } from "@/catchAsync";
import ErrorHandler from "@/error";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsync(async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            return next(new ErrorHandler("Please login to access this resource", 401));
        }

        // Add explicit verification options
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            algorithms: ['HS256']
        });

        const user = await User.findById(decoded._id);
        
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        if (error.name === 'JsonWebTokenError') {
            return next(new ErrorHandler("Invalid token", 401));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new ErrorHandler("Token expired", 401));
        }
        return next(new ErrorHandler("Authentication error", 401));
    }
});