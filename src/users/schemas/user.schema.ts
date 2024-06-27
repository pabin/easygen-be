import { Schema, Document, Model, model } from 'mongoose';

// Define the User interface to extend Document from Mongoose
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
export const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 64,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 64,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: true,
      maxlength: 132,
      select: false, // Exclude by default
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// Create and export the User model
export const User: Model<IUser> = model<IUser>('User', UserSchema);
