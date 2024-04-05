import { TypeOf, number, object, string } from 'zod';
import { validationErrors } from '../constants/errorMessages';
import { ageValidation } from './student';
import { CONTACT_NO_LENGTH } from '../constants';

export const createTeacherSchema = object({
  body: object({
    dateOfBirth: string({
      required_error: validationErrors.fieldIsRequired('date of birth'),
    }).refine((dob) => ageValidation(dob, 24), validationErrors.DOBError),
    mobileNo: number({
      required_error: validationErrors.fieldIsRequired('mobile number'),
    }).refine(
      (value) => numberLength({ value, length: CONTACT_NO_LENGTH }),
      validationErrors.shortLength('mobile number', CONTACT_NO_LENGTH)
    ),
    faculty: nativeEnum(faculty),
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
  }),
});

export type CreateTeacherInput = TypeOf<typeof createTeacherSchema>;
