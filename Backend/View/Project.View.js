

import { Router } from "express";
import { checkUser, CreateProject, deleteRoadmap, getRoadMap, MarkASRead, MarkASUnRead } from "../Controller/Projects/Project.controller.js";

import { clerkClient, requireAuth } from '@clerk/express'

const ProjectRouter = Router()

ProjectRouter.post('/get-roadmap',requireAuth(),CreateProject)
ProjectRouter.get('/mark-as-read/:topicId/:projectId',requireAuth(),MarkASRead)
ProjectRouter.get('/mark-as-unread/:topicId/:projectId',requireAuth(),MarkASUnRead)
ProjectRouter.get('/get-all',requireAuth(),getRoadMap)

ProjectRouter.delete('/delete/:RoadmapId', requireAuth(),deleteRoadmap)


export default ProjectRouter ;