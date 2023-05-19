import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

enum faculty {
  BIM = 'Bachelor of Information Management',
  BCA = 'Bachelor of Computer Application',
  BSC_CSIT = 'Bachelor of Science in Computer Science and Information Technology',
}

export interface StudentInput {
  name: string;
  email: string;
  password: string;
  DOB: Date;
  faculty: faculty;
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    DOB: { type: Date, required: true },
    faculty: { type: faculty, required: true },
    semester: { type: Number, required: true },
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
