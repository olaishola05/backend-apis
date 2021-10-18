const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || "3000";

// import routes
const postRoute = require("./routes/posts");

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to DB!");
});

// middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes Middleware
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome to my homepage");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
