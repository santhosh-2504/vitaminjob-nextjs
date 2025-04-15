// /api/jobs/titles.js
import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Job } from "@/lib/models/Job";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const jobs = await Job.find().select("title companyName -_id").lean();

  const searchData = jobs.map(job => ({
    title: job.title,
    companyName: job.companyName
  }));

  return res.status(200).json({
    success: true,
    searchData
  });
});