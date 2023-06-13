import mongoose from 'mongoose';

export function getRandomObjectID(): string {
  return new mongoose.Types.ObjectId().toString();
}
