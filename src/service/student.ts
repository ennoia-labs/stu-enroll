import StudentModel, { StudentInput } from '../models/student';

export async function createStudent(
  input: Omit<StudentInput, 'createdAt' | 'updatedAt' | 'comparePassword'>
) {
  try {
    const student = await StudentModel.create(input);

    return student;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getAllStudents() {
  try {
    const students = await StudentModel.find().select('-password');

    return students;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getStudent(id: string) {
  try {
    const student = await StudentModel.findById(id).select('-password');

    return student;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updateStudent(id: string, data: object) {
  try {
    const student = await StudentModel.findByIdAndUpdate(id, data, {
      new: true,
    }).select('-password');

    return student;
  } catch (e: any) {
    throw new Error(e);
  }
}
