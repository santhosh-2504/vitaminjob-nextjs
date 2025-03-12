import { User } from "@/lib/models/User";
import dbConnect from "@/lib/dbConnect";
import { catchAsync } from "@/lib/middlewares/catchAsync";

export default catchAsync(async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        await dbConnect();

        const user = await User.findOne({ email });

        res.status(200).json({
            exists: !!user
        });

    } catch (error) {
        console.error("Check Email Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})