import mongoose from "mongoose";
const roadmapSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    niche : {
        type : String,
        required : true
    },
    downloadCount : {
        type : Number,
        default : 0
    },
    url : {
        type : String,
        required : true,
    },
})

export const Roadmap = mongoose.models.Roadmap || mongoose.model("Roadmap", roadmapSchema);