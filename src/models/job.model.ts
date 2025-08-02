import mongoose, { Document, Schema } from 'mongoose';

export interface JobDocument extends Document {
  title: string;
  company: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const JobSchema = new Schema<JobDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: 'jobs',
  }
);


export const JobModel = mongoose.model<JobDocument>('Job', JobSchema);
