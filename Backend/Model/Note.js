import mongoose from "mongoose";


const note = mongoose.Schema({
    SubTopicId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    RoadmapId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Project"
    },
    UserId:{
        type:String,
        required:true
    },
    Note:{
        type:String,
        required:true
    }
})

const Note = mongoose.model("Note",note)

export default Note;