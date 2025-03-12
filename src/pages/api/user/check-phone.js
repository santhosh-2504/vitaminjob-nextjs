import { User } from "@/lib/models/User";
import dbConnect from "@/lib/dbConnect";
import { catchAsync } from "@/lib/middlewares/catchAsync";

export default catchAsync(async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required"
            });
        }

        await dbConnect();

        const user = await User.findOne({ phone });

        res.status(200).json({
            exists: !!user
        });

    } catch (error) {
        console.error("Check Phone Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})