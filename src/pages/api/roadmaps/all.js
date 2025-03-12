import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Roadmap } from "@/lib/models/Roadmap";

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

    const { niche, keyword } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const query = {};

    if (niche && niche !== 'All') {
        query.niche = niche;
    }

    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { niche: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
        ];
    }

    const totalRoadmaps = await Roadmap.countDocuments(query);
    const roadmaps = await Roadmap.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 })
        .lean();

    return res.status(200).json({
        success: true,
        roadmaps,
        currentPage: page,
        totalPages: Math.ceil(totalRoadmaps / limit),
        totalRoadmaps
    });
});