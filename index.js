const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// POST endpoint to accept fields like username and code
app.post("/api/code", async (req, res) => {
  const { username, code, codeLanguage, std } = req.body;
  if (!username || !code || !codeLanguage || !std) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        username,
        code,
        codeLanguage,
        std,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve all users
app.get("/api/code", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
