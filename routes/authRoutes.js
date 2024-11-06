// backend/routes/authRoutes.js

import express from 'express';
import multer from 'multer'; 
import path from 'path';
import fs from 'fs';

import { registerUser } from '../controllers/authController.js';
import { validateRegistrationData } from '../middleware/validationMiddleware.js';


const uploadsDir = path.resolve('C:/Users/DELL/Desktop/affiliate/anubhav-backend/backend/uploads');


if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) return cb(null, true);
  cb("Error: Images Only!");
};


const uploadFiles = multer({ storage, fileFilter }).fields([
  { name: "panImages", maxCount: 2 },
  { name: "aadharImages", maxCount: 2 },
]);

const router = express.Router();


router.post("/register",uploadFiles, validateRegistrationData, registerUser);

export default router;  
