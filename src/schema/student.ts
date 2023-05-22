import {
  CONTACT_NO_LENGTH,
  MIN_PASSWORD_LENGTH,
  POSTAL_CODE_LENGTH,
} from '../constants';
import { NepalStates, faculty } from '../models/student';
import { validationErrors } from '../constants/errorMessages';
import { number, object, string, nativeEnum, TypeOf } from 'zod';

function ageValidation(dob: string): boolean {
  const currentDate = new Date();
  const selectedDate = new Date(dob);
  const sixteenYearsAgo = new Date();
  sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
  return selectedDate <= currentDate && selectedDate <= sixteenYearsAgo;
}

function semesterValidation(semester: number): boolean {
  return semester >= 1 && semester <= 8;
}

interface paramsType {
  value: number;
  length: number;
}

function numberLength({ value, length }: paramsType): boolean {
  const currentLength = Math.floor(Math.log10(value)) + 1;
  return currentLength === length;
}

export const createStudentSchema = object({
  body: object({
    email: string({
      required_error: validationErrors.fieldIsRequired('email'),
    }).email(validationErrors.notValidEmail),
    password: string({
      required_error: validationErrors.fieldIsRequired('password'),
    }).min(MIN_PASSWORD_LENGTH),
    passwordConfirmation: string({
      required_error: validationErrors.fieldIsRequired('password confirmation'),
    }),
    dateOfBirth: string({
      required_error: validationErrors.fieldIsRequired('date of birth'),
    }).refine(ageValidation, validationErrors.DOBError),
    mobileNo: number({
      required_error: validationErrors.fieldIsRequired('mobile number'),
    }).refine(
      (value) => numberLength({ value, length: CONTACT_NO_LENGTH }),
      validationErrors.shortLength('mobile number', CONTACT_NO_LENGTH)
    ),
    faculty: nativeEnum(faculty),
    semester: number({
      required_error: validationErrors.fieldIsRequired('semester'),
    }).refine(semesterValidation, validationErrors.semesterNotInRange),
    firstName: string({
      required_error: validationErrors.fieldIsRequired('first name'),
    }),
    lastName: string({
      required_error: validationErrors.fieldIsRequired('last name'),
    }),
    address: string({
      required_error: validationErrors.fieldIsRequired('address'),
    }),
    city: string({
      required_error: validationErrors.fieldIsRequired('city'),
    }),
    state: nativeEnum(NepalStates),
    postalCode: number({
      required_error: validationErrors.fieldIsRequired('postal code'),
    }).refine(
      (value) => numberLength({ value, length: POSTAL_CODE_LENGTH }),
      validationErrors.shortLength('postal code', POSTAL_CODE_LENGTH)
    ),
    guardianName: string({
      required_error: validationErrors.fieldIsRequired('guardian name'),
    }),
    guardianContact: number({
      required_error: validationErrors.fieldIsRequired('guardian contact'),
    }).refine(
      (value) => numberLength({ value, length: CONTACT_NO_LENGTH }),
      validationErrors.shortLength('mobile number', CONTACT_NO_LENGTH)
    ),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: validationErrors.passwordsNoMatch,
    path: ['passwordConfirmation'],
  }),
});

export type CreateStudentInput = Omit<
  TypeOf<typeof createStudentSchema>,
  'body.passwordConfirmation'
>;
