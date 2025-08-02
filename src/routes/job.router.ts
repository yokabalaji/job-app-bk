import { Router } from "express";
import { createJob, getAllJobs, getJobById } from "../controllers/job.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const jobRouter = Router();

jobRouter.get('/jobs',authMiddleware,getAllJobs);

jobRouter.get('/jobs/:id',authMiddleware,getJobById);

jobRouter.post('/jobs',authMiddleware, createJob)


export default jobRouter;
