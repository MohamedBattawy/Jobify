import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    jobStatus: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy:{
      type:mongoose.Types.ObjectId,
      ref:'User',
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
