import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  panImages: [{ type: String, required: true }],
  aadharNumber: { type: String, required: true },
  aadharImages: [{ type: String, required: true }],
  isVerified: { type: Boolean, default: false },
  bankDetails: {
    accountNumber: { type: String, required: true },
    ifscCode: {
      type: String,
      required: true,
      match: /^[A-Za-z]{4}0[A-Z0-9]{6}$/,
    },
    bankName: { type: String, required: true },
    branchName: { type: String, required: true },
  },
});

export default mongoose.model("User", userSchema);
