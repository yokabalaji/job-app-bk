import { RequestHandler } from 'express';
import { JobModel } from '../models/job.model';

export const getAllJobs: RequestHandler = async (req, res, next) => {
  try {
    const jobs = await JobModel.find(
      {is_active:true }
    );

      const response = {
      success: true,
      message: 'Jobs fetched successfully',
      data: jobs
    };
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({sucess:false, message: 'Internal server error' });
  }
};

export const getJobById: RequestHandler = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await JobModel.findOne({_id:jobId, is_active:true});
    if (!job) {
      return res.status(404).json({success:false, message: `Job with ID ${jobId} not found` });
    }
    const response={
      success:true, 
      message: 'Job fetched successfully', 
      data: job
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({success:false, message: 'Internal server error' });
  }
};

export const createJob: RequestHandler = async (req, res) => {
  const { title, company, description } = req.body;

  if (!title || !company || !description) {
    return res.status(400).json({success:false, message: 'All fields are required' });
  }

  try {
    const existingJob = await JobModel.findOne({ company });
    if (existingJob) {
      return res.status(409).json({success:false, message: 'Company already exists' });
    }

    const newJob = new JobModel({ title, company, description });
    await newJob.save();

    const response={
      success:true, 
      message: 'Job created successfully', 
      data: newJob 
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({success:false, message: 'Internal server error' });
  }
};
