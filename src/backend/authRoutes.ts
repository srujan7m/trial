import { Request, Response } from "express";

// Hardcoded users for demonstration
const users = [
  { email: "user@example.com", password: "password123" },
];

// Function to handle login requests
export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if email exists
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if password is correct
  if (user.password !== password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  // If successful, return a success message
  return res.status(200).json({ message: "Login successful!" });
};
