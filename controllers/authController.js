import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  console.log(req.files);

  const { name, email, mobile, password, aadharNumber, bankDetails } = req.body;
  const panImages = req.files.panImages
    ? req.files.panImages.map((file) => file.path)
    : [];
  const aadharImages = req.files.aadharImages
    ? req.files.aadharImages.map((file) => file.path)
    : [];

  if (
    !name ||
    !email ||
    !mobile ||
    !password ||
    !aadharNumber ||
    !bankDetails
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

   if (panImages.length !== 2) {
     return res
       .status(400)
       .json({ message: "You must upload exactly two PAN images." });
   }

   if (aadharImages.length !== 2) {
     return res
       .status(400)
       .json({ message: "You must upload exactly two Aadhar images." });
   }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 15);

  // Create user with bank details
  const user = new User({
    name,
    email,
    mobile,
    password: hashedPassword,
    panImages,
    aadharNumber,
    aadharImages,
    bankDetails: {
      accountNumber: bankDetails.accountNumber,
      ifscCode: bankDetails.ifscCode,
      bankName: bankDetails.bankName,
      branchName: bankDetails.branchName,
    },
  });

  try {
    await user.save();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 3600000,
    });

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
