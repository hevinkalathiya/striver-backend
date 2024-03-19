import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const createCode = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, code, codeLanguage, std } = req.body;
  if (!username || !code || !codeLanguage) {
    res.status(400).json({ error: "Invalid input" });
    return;
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
};

export const getCode = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
