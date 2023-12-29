import mongoose from 'mongoose';
import { NepalStates } from './student';

export enum faculty {
  BIM = 'Bachelor of Information Management',
  BCA = 'Bachelor of Computer Application',
  BSC_CSIT = 'Bachelor of Science in Computer Science and Information Technology',
}

enum Qualification {
  BACHELORS = "Bachelor's Degree",
  MASTERS = "Master's Degree",
  PHD = 'Ph.D. (Doctorate)',
  TEACHING_CERTIFICATION = 'Teaching Certification or License',
  PROFESSIONAL_DEVELOPMENT = 'Professional Development Courses',
}

export interface TeacherInput {
  dateOfBirth: string;
  mobileNo: number;
  faculty: faculty;
  subjectName: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: NepalStates;
  postalCode: number;
  qualification: Qualification;
  experience: number;
  isActive: boolean;
  createdAt: Date; // timestamp
  updatedAt: Date; // timestamp
}

export interface TeacherDocument extends TeacherInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const teacherSchema = new mongoose.Schema(
  {
    dateOfBirth: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    faculty: {
      type: faculty,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: NepalStates,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    qualification: {
      type: Qualification,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    updatedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const TeacherModel = mongoose.model<TeacherDocument>('Teacher', teacherSchema);

export default TeacherModel;
