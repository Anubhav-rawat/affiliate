export const validateRegistrationData = (req, res, next) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded Files:", req.files);

  const { name, email, mobile, aadharNumber, bankDetails } = req.body;
  const { panImages, aadharImages } = req.files || {};

  // Basic field validation
  if (!name || !email || !mobile || !aadharNumber || !bankDetails) {
    return res
      .status(400)
      .json({ message: "All fields, including bank details, are required." });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Mobile validation
  if (mobile.length !== 10 || isNaN(mobile)) {
    return res.status(400).json({ message: "Invalid mobile number." });
  }

  // Aadhar number validation
  if (aadharNumber.length !== 12 || isNaN(aadharNumber)) {
    return res.status(400).json({ message: "Invalid Aadhar number." });
  }

  // Image validation
  if (!panImages || panImages.length !== 2) {
    return res
      .status(400)
      .json({ message: "You must upload exactly two PAN images." });
  }
  if (!aadharImages || aadharImages.length !== 2) {
    return res
      .status(400)
      .json({ message: "You must upload exactly two Aadhar images." });
  }

  // Bank details validation
  const { accountNumber, ifscCode, bankName, branchName } = bankDetails;
  if (!accountNumber || !ifscCode || !bankName || !branchName) {
    return res.status(400).json({ message: "All bank details are required." });
  }
  const ifscRegex = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;
  if (!ifscRegex.test(ifscCode)) {
    return res.status(400).json({ message: "Invalid IFSC code format." });
  }

  next();
};
