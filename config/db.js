const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect successfully!");
  } catch (error) {
    console.log(error);
  }
};

mongoose.set("strictQuery", true);

module.exports = { connectDB };
