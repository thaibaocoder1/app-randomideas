const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text field"],
    },
    tag: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Idea", IdeaSchema);
