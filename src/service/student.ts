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

export interface queryString {
  limit: string;
}

export async function getAllStudents({ limit }: queryString) {
  try {
    let studentsQuery = StudentModel.find().select('-password');

    if (limit && Number.isInteger(parseInt(limit))) {
      studentsQuery = studentsQuery.limit(parseInt(limit));
    }

    const students = await studentsQuery.exec();

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

export async function deleteStudent(id: string) {
  try {
    await StudentModel.findByIdAndDelete(id);
  } catch (e: any) {
    throw new Error(e);
  }
}
