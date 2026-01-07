import mongoose from "mongoose";


const resource = mongoose.Schema({
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
    Link:{
        type:String,
        required:true
    },
    Topic:{
        type:String,
        required:true
    }
})

const Resource = mongoose.model("Resource",resource)

export default Resource;