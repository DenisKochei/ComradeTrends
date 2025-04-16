
import mongoose from "mongoose";

const userVerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    uniquestring: {
      type: String,
      unique: true,
    },
    createdAt: {
      type: Date,
    },
   
    expiresAt : {
      type:Date, 
    },
  },
  { timestamps: true }
  //timestamp is used to save the time of creation and the time af update
);

const User = mongoose.model("userVerification", userVerificationSchema);

export default User;
