import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export enum faculty {
  BIM = 'Bachelor of Information Management',
  BCA = 'Bachelor of Computer Application',
  BSC_CSIT = 'Bachelor of Science in Computer Science and Information Technology',
}

export enum NepalStates {
  'One' = 'Koshi',
  'Two' = 'Madhesh',
  'Three' = 'Bagmati',
  'Four' = 'Gandaki',
  'Five' = 'Lumbini',
  'Six' = 'Karnali',
  'Seven' = 'Sudur Paschim',
}

export interface StudentInput {
  email: string;
  password: string;
  dateOfBirth: string;
  mobileNo: number;
  faculty: faculty;
  semester: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: NepalStates;
  postalCode: number;
  guardianName: string;
  guardianContact: number;
  createdAt: Date; // timestamp
  updatedAt: Date; // timestamp
  comparePassword(candidatePassword: string): Promise<Boolean>; // ref:https://youtu.be/BWUi6BS9T5Y?t=2033
}

export interface StudentDocument extends StudentInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
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
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    guardianName: {
      type: String,
      required: true,
    },
    guardianContact: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});

studentSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(candidatePassword, this.password);
    return result;
  } catch (e) {
    throw e;
  }
};

const StudentModel = mongoose.model<StudentDocument>('Student', studentSchema);

export default StudentModel;
