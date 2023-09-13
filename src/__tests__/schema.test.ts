import { createStudentSchema } from '../schema/student';
import { NepalStates, faculty } from '../models/student';
import { INVALID_DATA_VALUE, NO_DATA_ERRORS } from '../constants/tests';

describe('Schema Validation', () => {
  describe('given the data is in valid format', () => {
    it('should not throw any errors', () => {
      const studentData = {
        email: 'test@example.com',
        password: 'test123456',
        passwordConfirmation: 'test123456',
        dateOfBirth: '2000-01-01',
        mobileNo: 1234567890,
        faculty: faculty.BIM,
        semester: 2,
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'Example City',
        state: NepalStates.One,
        postalCode: 12345,
        guardianName: 'Jane Doe',
        guardianContact: 9876543210,
      };

      expect(() =>
        createStudentSchema.parse({ body: studentData })
      ).not.toThrow();
    });
  });

  describe('given the data is empty', () => {
    it('should throw required errors for missing fields', () => {
      const studentData = {};

      try {
        createStudentSchema.parse({ body: studentData });
      } catch (error: any) {
        error.issues.forEach((issue: any) => {
          const path = issue.path[1]; // Accessing the 1st index of the "path" array
          const originalMsg = NO_DATA_ERRORS[path];

          expect(originalMsg && originalMsg).toBe(issue.message);
        });
      }
    });
  });

  describe('given the data has invalid values', () => {
    it('should throw relavent errors', () => {
      const studentData = {
        email: 'test@example',
        password: 'test',
        passwordConfirmation: 'test',
        dateOfBirth: '1995-01-01',
        mobileNo: 12345678,
        faculty: 'Invalid',
        semester: 9,
        state: 'Invalid',
        postalCode: 123,
        guardianName: '',
        guardianContact: 98765,
      };

      try {
        createStudentSchema.parse({ body: studentData });
      } catch (error: any) {
        error.issues.forEach((issue: any) => {
          const path = issue.path[1]; // Accessing the 1st index of the "path" array
          const originalMsg = INVALID_DATA_VALUE[path];

          expect(issue.message).toBe(originalMsg);
        });
      }
    });
  });
});
