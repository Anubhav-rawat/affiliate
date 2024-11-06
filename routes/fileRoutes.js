import express from 'express';  
import { viewFile } from '../controllers/fileController.js';  
import { verifyToken } from '../middleware/authMiddleware.js'; 

const router = express.Router();


router.post("/view", verifyToken, viewFile);

export default router;  
