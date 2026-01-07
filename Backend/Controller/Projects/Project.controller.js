
import mongoose from "mongoose";
import { getData } from "../../Services/AIService.js";
import Project from "../../Model/Project.js";
import { clerkClient, getAuth } from "@clerk/express";
import Note from "../../Model/Note.js";
import Resource from "../../Model/Resources.js";
import { io } from "../../Services/Socket.js";


//transform data

const transformRoadmap = (aiRoadmap) => {
    return aiRoadmap.map((weekObj, index) => {
        const weekKey = Object.keys(weekObj)[0]; // "week-1"
        const weekNumber = Number(weekKey.split("-")[1]);

        const weekData = weekObj[weekKey];

        return {
            weekNumber,
            topics: weekData.map((topicItem) => ({
                name: topicItem.name,
                explanation: topicItem.explaination, // fixing typo here
                subtopics: topicItem.topic.flatMap(t =>
                    t.subtopics.map(sub => ({
                        name: sub.name
                    }))
                ),
            })),
        };
    });
};


export const CreateProject = async (req, res) => {
    try {
        const { level, aim, timeline } = req.body

        io.emit('passedLevel', 1)

        const { userId } = getAuth(req)

        if (!level || !aim || !timeline) {
            throw new Error('You Have Missed Prompt please add')
        }

        const UserDataFromFrontEnd = {
            useraim: aim,
            userlevel: level,
            CompleteRoadmapIn: timeline
        }


        const data = await getData(UserDataFromFrontEnd, userId)

        io.emit('passedLevel', 1)

        const actData = transformRoadmap(data.data)



        const project = await Project.create({
            name:data.name,
            userId,
            roadmap: actData,
        });

        io.emit('passedLevel', 1)


        return res.status(200).json({
            data:data,
            project:project
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const MarkASRead = async (req, res) => {
    try {
        const { userId } = getAuth(req)

        const { topicId,projectId } = req.params


        const result = await Project.updateOne(
            {
                userId: userId, // 🔒 ownership check
                "roadmap.topics.subtopics._id": new mongoose.Types.ObjectId(topicId),
            },
            {
                $set: {
                    "roadmap.$[].topics.$[].subtopics.$[s].isCompleted": true,
                },
            },
            {
                arrayFilters: [{ "s._id": new mongoose.Types.ObjectId(topicId) }],
            }
        );

        const data = await Project.findById(projectId)


        return res.status(200).json({
            SuccesFul: true,
            data:data
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
}

export const MarkASUnRead = async (req, res) => {
    try {
        const { userId } = getAuth(req)

            const { topicId,projectId } = req.params

        const result = await Project.updateOne(
            {
                userId: userId, // 🔒 ownership check
                "roadmap.topics.subtopics._id": new mongoose.Types.ObjectId(topicId),
            },
            {
                $set: {
                    "roadmap.$[].topics.$[].subtopics.$[s].isCompleted": false,
                },
            },
            {
                arrayFilters: [{ "s._id": new mongoose.Types.ObjectId(topicId) }],
            }
        );

        const data = await Project.findById(projectId)


        return res.status(200).json({
            SuccesFul: true,
            data:data
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const deleteRoadmap = async (req, res) => {
    try {
        const { userId } = getAuth(req)

        const { RoadmapId } = req.params

        // const deleteNotes = await Note.deleteMany({
        //     UserId: userId,
        //     RoadmapId: RoadmapId
        // });

        // const deleteResources = await Resource.deleteMany({
        //     UserId: userId,
        //     RoadmapId: RoadmapId
        // });

        const deleteMap = await Project.deleteOne({_id:RoadmapId,userId:userId})

        return res.status(200).json({
            succesfull: true,
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const checkUser = async (req, res) => {
    try {
        const { userId } = getAuth(req)


        const user = await clerkClient.users.getUser(userId)

        return res.status(200).json({
            user: user,
            app: userId,
            data: "fine"
        })
    } catch (error) {
        return res.status(500).json({
            error: "We had an error"
        })
    }
}


export const getRoadMap = async (req,res)=>{
    try {
        const { userId } = getAuth(req)

        const data = await Project.find({userId:userId})

        return res.status(200).json({
            data:data
        })
        
    } catch (error) {
         return res.status(500).json({
            error: "We had an error"
        })
    }
}