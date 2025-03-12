// pages/api/jobs/[id].js
import dbConnect from "@/lib/dbConnect";
import { Job } from "@/lib/models/Job";
import { catchAsync } from "@/lib/middlewares/catchAsync";

export default catchAsync(async (req, res) => {
  try {
    await dbConnect();
    const { method } = req;
    const { id } = req.query;

    if (method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
    }

    const job = await Job.findById(id).lean();
    
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    
    // Convert all MongoDB objects to serializable format
    const serializedJob = {
      ...job,
      _id: job._id.toString(),
      createdAt: job.createdAt ? job.createdAt.toISOString() : null,
      updatedAt: job.updatedAt ? job.updatedAt.toISOString() : null,
      expiryDate: job.expiryDate ? job.expiryDate.toISOString() : null,
      skills: job.skills || [],
      location: job.location || [],
      benefits: job.benefits || [],
    };
    return res.status(200).json({ success: true, job: serializedJob });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
});