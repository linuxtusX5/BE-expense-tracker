import express from "express";
import Income from "../models/Income.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const income = await Income.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(income);
  } catch (err) {
    console.error("Get income error:", err);
    res.status(500).json({ message: "Failed to fetch income" });
  }
});

router.post("/", auth, async (req, res) => {
  const income = new Income({
    userId: req.user._id,
    amount: req.body.amount,
    source: req.body.source,
    description: req.body.description,
  });

  await income.save();
  res.status(201).json(income);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Income.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
