import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  niche: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  questions: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      required: true
    },
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length === 4,
        message: "A question must have exactly 4 options."
      },
    },
    correctOption: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => v >= 0 && v < 4,
        message: "Correct option must be a valid index (0-3)."
      },
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);