import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Job } from "@/lib/models/Job";

export default catchAsync(async (req, res) => {
    await dbConnect();
    
    const { id } = req.query;
    const currentJob = await Job.findById(id);
    
    if (!currentJob) {
        return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Find similar jobs based on niche, skills, or industry
    const similarJobs = await Job.find({
        _id: { $ne: id }, // Exclude current job
        $or: [
            { niche: currentJob.niche },
            { skills: { $in: currentJob.skills } },
            { industry: currentJob.industry }
        ],
    })
    .limit(4)
    .select('title companyName location jobType companyLogo _id')
    .lean();

    return res.status(200).json({
        success: true,
        jobs: similarJobs
    });
});