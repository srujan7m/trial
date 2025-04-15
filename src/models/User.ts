import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  userType: 'doctor' | 'hospital' | 'patient';
  license: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  userType:  { type: String, enum: ['doctor', 'hospital', 'patient'], required: true },
  license:   { type: String, required: true },
  password:  { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
