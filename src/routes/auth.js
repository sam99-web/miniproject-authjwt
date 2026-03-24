import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const users = [];

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email))
    return res.status(400).json({ error: "Email deja utilise" });
  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), email, password: hashed });
  res.status(201).json({ message: "Utilisateur cree" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "Identifiants invalides" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Identifiants invalides" });
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  res.json({ token });
});

export default router;
