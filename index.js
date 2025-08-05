import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Db from "./config/database.js";
import auth from "./routes/auth.js";
import expenses from "./routes/expenses.js";
import categories from "./routes/categories.js";

dotenv.config();
Db();

const app = express();

// Middleware
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", auth);
app.use("/api/expenses", expenses);
app.use("/api/categories", categories);

const PORT = process.env.PORT || 3001;
// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.DEV_MODE} Port ${PORT}`);
});
