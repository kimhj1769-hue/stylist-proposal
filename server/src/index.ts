import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import clothingRoutes from './routes/clothingRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-stylist';

// 미들웨어
app.use(cors());
app.use(express.json());

// API 라우트
app.use('/api/clothing', clothingRoutes);

// 기본 라우트
app.get('/', (req: Request, res: Response) => {
  res.send('Personal Stylist API Server is running!');
});

// MongoDB 연결 및 서버 실행
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
