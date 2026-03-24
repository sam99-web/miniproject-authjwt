import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { authenticate } from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Accès autorisé', user: req.user });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
