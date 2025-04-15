import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Job } from "@/lib/models/Job";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const jobTitles = await Job.find().select("title -_id").lean();

  const titles = jobTitles.map(job => job.title);

  return res.status(200).json({
    success: true,
    titles
  });
});
