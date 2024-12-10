import express from 'express';
import multer from 'multer';
import { evaluateLoanBookController } from '../controllers/loanBookController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage });

router.post('/evaluate-loan-book', upload.single('file'), evaluateLoanBookController);

export default router;
