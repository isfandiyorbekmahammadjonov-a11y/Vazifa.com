import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 5000;

const JWT_SECRET = "super_secret_admin_key_2026";

app.use(cors());
app.use(express.json());

// Soxta Admin (Parol: admin123)
const ADMIN_USER = {
  id: 1,
  username: "admin",
  passwordHash: bcrypt.hashSync("admin123", 10),
  role: "superadmin",
};

// Login API Endpoint
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Login va parol kiritilishi shart!",
      });
    }

    if (username !== ADMIN_USER.username) {
      return res.status(401).json({
        success: false,
        message: "Login yoki parol noto'g'ri!",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      ADMIN_USER.passwordHash,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Login yoki parol noto'g'ri!",
      });
    }

    const token = jwt.sign(
      {
        id: ADMIN_USER.id,
        username: ADMIN_USER.username,
        role: ADMIN_USER.role,
      },
      JWT_SECRET,
      { expiresIn: "2h" },
    );

    return res.status(200).json({
      success: true,
      message: "Tizimga muvaffaqiyatli kirildi",
      token: token,
      user: {
        id: ADMIN_USER.id,
        username: ADMIN_USER.username,
        role: ADMIN_USER.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server http://localhost:${PORT} da ishlamoqda`);
});
