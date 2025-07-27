const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = new Map();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: "Name, email, and age are required." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  const id = uuidv4();
  const user = { id, name, email, age };
  users.set(id, user);

  res.status(201).json({ message: "User created successfully", user });
});

app.get("/users", (req, res) => {
  res.status(200).json(Array.from(users.values()));
});

app.get("/users/:id", (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found." });
  res.status(200).json(user);
});

app.put("/users/:id", (req, res) => {
  const existingUser = users.get(req.params.id);
  if (!existingUser) return res.status(404).json({ error: "User not found." });

  const { name, email, age } = req.body;

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  const updatedUser = {
    ...existingUser,
    name: name ?? existingUser.name,
    email: email ?? existingUser.email,
    age: age ?? existingUser.age,
  };

  users.set(req.params.id, updatedUser);
  res.status(200).json({ message: "User updated successfully", user: updatedUser });
});

app.delete("/users/:id", (req, res) => {
  if (!users.has(req.params.id)) {
    return res.status(404).json({ error: "User not found." });
  }
  users.delete(req.params.id);
  res.status(200).json({ message: "User deleted successfully." });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});