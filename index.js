import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Db from "./config/database.js";
import auth from "./routes/auth.js";
import expenses from "./routes/expenses.js";
import categories from "./routes/categories.js";
import incomeRoutes from "./routes/income.js";

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
app.use("/api/income", incomeRoutes);

const PORT = process.env.PORT || 3001;
// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} Port ${PORT}`);
});
