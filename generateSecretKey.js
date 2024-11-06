import crypto from "crypto";

// Generate a secure random secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Log the generated key
const secretKey = generateSecretKey();
console.log("Generated JWT Secret Key:", secretKey);
