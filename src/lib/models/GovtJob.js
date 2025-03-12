import mongoose from "mongoose";

const govtJobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  qualification: { type: String, required: true },
  salary: { type: Number, required: true },
  fees: { type: String, required: true },
  applicationDeadline: { type: String, required: true },
  companyLogo: { type: String, required: true },
  companyName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const govtJob = mongoose.models.GovtJob || mongoose.model("GovtJob", govtJobSchema);



