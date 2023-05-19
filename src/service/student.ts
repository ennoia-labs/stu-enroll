import StudentModel, { StudentInput } from '../models/student';

export async function createStudent(input: StudentInput) {
  try {
    const student = await StudentModel.create(input);

    return student;
  } catch (e: any) {
    throw new Error(e);
  }
}
