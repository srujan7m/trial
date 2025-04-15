import express, { Request, Response } from 'express';  // Import express and types

const app = express();

// Middleware to parse JSON
app.use(express.json());  // This allows us to parse incoming JSON requests

// Example login route handler
const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Your login logic here, for now, we'll just simulate success.
  if (email === "test@example.com" && password === "password") {
    res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// Add POST route
app.post('/api/login', loginUser);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
