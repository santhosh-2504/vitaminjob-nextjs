import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Quiz } from "@/lib/models/Quiz";

export default catchAsync(async (req, res) => {
    await dbConnect();
    console.log("DB connected");

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59');

    const { method } = req;

    // Allow only GET requests
    if (method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { niche, searchKeyword } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const query = {};

    if (niche && niche !== 'All') {
        query.niche = niche;
    }

    if (searchKeyword) {
        query.$or = [
            { title: { $regex: searchKeyword, $options: 'i' } },
            { niche: { $regex: searchKeyword, $options: 'i' } },
            { description: { $regex: searchKeyword, $options: 'i' } },
            { "questions.questionText": { $regex: searchKeyword, $options: "i" } }, // ✅ Fixed
        ];
    }

    const totalQuizzes = await Quiz.countDocuments(query);
    const quizzes = await Quiz.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 })
        .lean();

    return res.status(200).json({
        success: true,
        quizzes,
        currentPage: page,
        totalPages: Math.ceil(totalQuizzes / limit),
        totalQuizzes
    });
});
