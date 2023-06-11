export interface DynamicStringObject {
  [key: string]: string;
}

export const NO_DATA_ERRORS: DynamicStringObject = {
  email: 'The field "email" is required.',
  password: 'The field "password" is required.',
  passwordConfirmation: 'The field "password confirmation" is required.',
  dateOfBirth: 'The field "date of birth" is required.',
  mobileNo: 'The field "mobile number" is required.',
  faculty: 'Required',
  semester: 'The field "semester" is required.',
  firstName: 'The field "first name" is required.',
  lastName: 'The field "last name" is required.',
  address: 'The field "address" is required.',
  city: 'The field "city" is required.',
  state: 'Required',
  postalCode: 'The field "postal code" is required.',
  guardianName: 'The field "guardian name" is required.',
  guardianContact: 'The field "guardian contact" is required.',
};

export const INVALID_DATA_VALUE: DynamicStringObject = {
  email: 'Provided string is not a valid email',
  password: 'String must contain at least 8 character(s)',
  mobileNo: 'The "mobile number" field must be at least of 10 length.',
  faculty:
    "Invalid enum value. Expected 'Bachelor of Information Management' | 'Bachelor of Computer Application' | 'Bachelor of Science in Computer Science and Information Technology', received 'Invalid'",
  semester: 'Semester must be between 1 and 8',
  firstName: 'The field "first name" is required.',
  lastName: 'The field "last name" is required.',
  address: 'The field "address" is required.',
  city: 'The field "city" is required.',
  state:
    "Invalid enum value. Expected 'Koshi' | 'Madhesh' | 'Bagmati' | 'Gandaki' | 'Lumbini' | 'Karnali' | 'Sudur Paschim', received 'Invalid'",
  postalCode: 'The "postal code" field must be at least of 5 length.',
  guardianName: 'The field "guardian name" is required.',
  guardianContact: 'The "mobile number" field must be at least of 10 length.',
};
