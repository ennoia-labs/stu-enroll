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
