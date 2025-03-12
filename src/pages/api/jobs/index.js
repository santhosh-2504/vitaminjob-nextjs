import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Job } from "@/lib/models/Job";

export default catchAsync(async (req, res) => {
    await dbConnect();
    console.log("DB connected");

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59')
    
    const {method} = req;

    if(method !== 'GET'){
        res.setHeader('Allow',['GET']);
        throw new Error("Method not allowed");
    }

    const { city, niche, searchKeyword } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const query = {};

    if(city && city !== 'All'){
        query.location = city;
    }
    if(niche && niche !== 'All'){
        query.niche = niche;
    }
    if(searchKeyword){
        query.$or = [
         { title : {$regex : searchKeyword, $options : 'i'}},
         { lengthyDescription : {$regex : searchKeyword, $options : 'i'}},
         { shortDescription : {$regex : searchKeyword, $options : 'i'}},
         { companyName : {$regex : searchKeyword, $options : 'i'}},
         { jobType : {$regex : searchKeyword, $options : 'i'}},
         { skills : {$regex : searchKeyword, $options : 'i'}},
        ]
    }
    const totalJobs = await Job.countDocuments(query);
    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
    .select('-__v')
    .skip(skip)
    .limit(limit)
    .sort({ _id : -1 })
    .lean();

    return res.status(200).json({
        success : true,
        jobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
        totalJobs
    });
})