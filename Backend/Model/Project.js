import mongoose from "mongoose";

const { Schema } = mongoose;

/* ---------------- Subtopic Schema ---------------- */
const subtopicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true } // enables automatic ObjectId for each subtopic
);

/* ---------------- Topic Schema ---------------- */
const topicSchema = new Schema(
  {
    subtopics: {
      type: [subtopicSchema],
      required: true,
    },
    name:{
      type:String,
      required:true
    },
    explanation:{
      type:String,
      required:true
    }
  },
  { _id: true }
);

/* ---------------- Week Schema ---------------- */
const weekSchema = new Schema(
  {
    weekNumber: {
      type: Number,
      required: true,
    },
    topics: {
      type: [topicSchema],
      required: true,
    },
  },
  { _id: true }
);

/* ---------------- Project Schema ---------------- */
const projectSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    roadmap: {
      type: [weekSchema],
      required: true,
    },
    name:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);


const Project = mongoose.model("Project", projectSchema);

export default Project;
