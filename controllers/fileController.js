

import jwt from 'jsonwebtoken';  
import bcrypt from 'bcryptjs';  
import User from '../models/User.js';  
import path from 'path';  
import fs from 'fs';  

// Middleware
export const viewFile = async (req, res) => {  
  const { token } = req.cookies;
  const { password, imageType, index } = req.body; 

  if (!token || !password){
    return res.status(400).json({ message: "Token and password required" });
  }

  if(index < 0 || index > 1)
    return res.status(400).json({message : "Invalid image request"});

  try {
    // Decoding
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    // verifying password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    const imagesArray = imageType === "pan" ? user.panImages : user.aadharImages;
    if (!imagesArray[index]) {
      return res.status(400).json({ message: "Image not found" });
    }

    
    const imagePath = path.resolve(imagesArray[index]);
    fs.access(imagePath, fs.constants.R_OK, (err) => {
      if (err) {
        return res.status(500).json({ message: "File not found or inaccessible" });
      }
      res.sendFile(imagePath);
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access or invalid token" });
  }
};
