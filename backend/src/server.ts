import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(router);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 