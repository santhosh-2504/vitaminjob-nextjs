import dbConnect from "@/lib/dbConnect";
import { User } from "@/lib/models/User";
import { catchAsync } from "@/lib/middlewares/catchAsync";
import jwt from "jsonwebtoken";

export default catchAsync(async (req, res) => {
    if (req.method !== 'PUT') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();
        
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const { name, email, phone, address, firstNiche, secondNiche, thirdNiche } = req.body;
        const newUserData = {
            name,
            email,
            phone,
            address,
            firstNiche,
            secondNiche,
            thirdNiche
        };


        // Only update fields that are provided
        if (name !== undefined) {
            if (name.length < 3 || name.length > 30) {
                return res.status(400).json({
                    success: false,
                    message: "Name must be between 3 and 30 characters"
                });
            }
            newUserData.name = name.trim();
        }
        // Only proceed if there are fields to update
        if (Object.keys(newUserData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided for update"
            });
        }


        const updatedUser = await User.findByIdAndUpdate(
            decoded._id,
            newUserData,
            {
                new: true,
                runValidators: true,
            }
        );



        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
});