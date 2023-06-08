import dotenv from 'dotenv';
import mongoose from 'mongoose';
import supertest from 'supertest';
import createServer from '../utils/server';

const app = createServer();
dotenv.config();

beforeAll(async () => {
  const DB_URI = process.env.DB_URI as string;
  await mongoose.connect(DB_URI);
});

describe('Student', () => {
  describe('Get student', () => {
    describe("given the student doesn't exist", () => {
      it('should return 404', async () => {
        const STUDENT_ID = '64819aefec30dc88566d0a00';
        const res = await supertest(app).get(`/students/${STUDENT_ID}`);

        expect(res.statusCode).toBe(404);
      });
    });

    describe('given the student exists', () => {
      it('should return status 200 and student doc.', async () => {
        const STUDENT_ID = '6475ee2242f5d01e18d28d34';
        const res = await supertest(app).get(`/students/${STUDENT_ID}`);

        expect(res.statusCode).toBe(200);
        // expect(res.body)
      });
    });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});
