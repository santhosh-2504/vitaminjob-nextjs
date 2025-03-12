import { User } from "@/lib/models/User";
import { sendEmail } from "@/utils/sendEmail";

// Generate OTP function
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email is not registered"
            });
        }

        // Generate OTP
        const otp = generateOTP();
        
        // Save OTP and its expiry in user document
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();

        // Send email
        const message = `Your OTP for password reset is: ${otp}. This OTP will expire in 5 minutes.`;
        await sendEmail({
            email: user.email,
            subject: "Password Reset OTP",
            message,
            type: 'login'
        });

        res.status(200).json({
            success: true,
            message: "Password reset OTP sent to your email"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        console.log(error);
    }
}