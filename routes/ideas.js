const express = require("express");
const router = express.Router();
const Idea = require("../models/idea");

const ideas = [
  {
    id: 1,
    name: "Idea 1",
  },
  {
    id: 2,
    name: "Idea 2",
  },
];

// Get all ideas
router.get("/", async (req, res, next) => {
  try {
    const ideas = await Idea.find({});
    if (!ideas) {
      res.status(404).json({
        success: false,
        message: "Not found ideas",
      });
    } else {
      res.status(200).json({
        success: true,
        data: ideas,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error from server!" });
  }
});
// Get single idea with id
router.get("/:id", async (req, res, next) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id });
    if (!idea) {
      res.status(404).json({
        success: false,
        message: "Not found idea",
      });
    }
    res.status(200).json({
      success: true,
      data: idea,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error from server!" });
  }
});
// Add an idea
router.post("/", async (req, res, next) => {
  try {
    const idea = await Idea.create(req.body);
    if (!idea) {
      return res
        .status(404)
        .json({ success: false, error: "Resource not found" });
    }
    res.status(201).json({
      success: true,
      data: idea,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error from server!" });
  }
});
// Update single idea with id
router.put("/:id", async (req, res, next) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id });
    if (idea.username === req.body.username) {
      const idea = await Idea.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      if (idea) {
        res.status(201).json({
          success: true,
          data: idea,
        });
      }
    }
    res.status(403).json({
      success: false,
      message: "You are not authorized to update this resource!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error from server!" });
  }
});
// Delete single idea with id
router.delete("/:id", async (req, res, next) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id });
    if (idea.username === req.body.username) {
      await Idea.deleteOne({ _id: req.params.id });
      res.status(201).json({
        success: true,
        message: "Delete successfully!",
      });
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this resource!",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error from server!" });
  }
});

module.exports = router;
