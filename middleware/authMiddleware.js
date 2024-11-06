// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  // Checking token 
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // Verifying token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
