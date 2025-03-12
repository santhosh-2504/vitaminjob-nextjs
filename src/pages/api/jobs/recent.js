import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Job } from "@/lib/models/Job";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const recentJobs = await Job.find()
    .sort( {_id : -1})
    .limit(4)
    .select('title companyName location jobType companyLogo _id')
    .lean();


  return res.status(200).json({
    success: true,
    jobs: recentJobs
  });
});