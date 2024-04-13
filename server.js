const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const database = require("./config/db");

const app = express();

const corOptions = {
  origin: ["http://localhost:5000", "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corOptions));

database.connectDB();

const ideaRouter = require("./routes/ideas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/ideas", ideaRouter);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
