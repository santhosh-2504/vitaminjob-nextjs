import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  lengthyDescription: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  location: {
    type: [String],
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  niche: {
    type: String,
    required: true
  },
  applyLink: {
    type: String,
    required: true
  },
  companyDescription: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ["Entry", "Mid", "Senior"],
    required: true
  },
  benefits: {
    type: [String],
    default: []
  },
  remoteOption: {
    type: Boolean,
    default: false
  },
  companyWebsite: {
    type: String
  },
  featuredJob: {
    type: Boolean,
    default: false
  },
  expiryDate: {
    type: Date
  },
  keywords: {
    type: [String],
    default: []
  },
  recruiterContact: {
    email: { type: String },
    phone: { type: String }
  },
  slug : {
    type : String,
  }
}, { timestamps: true });

export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
