import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  fullname:{
    type: String
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    default: 'User'
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  tickets: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "tickets",
    },
  ],
});

export const usersModel = mongoose.model("users", UsersSchema);