require("dotenv").config();
const { EventEmitter } = require("events");
const eventEmitter = new EventEmitter();
// express webserver main import
const express = require("express");
const app = express();

//middleware imports
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

//router imports
const Song = require("./routes/songRoute");
const Image = require("./routes/imageRoute");

// logging
app.use(morgan("tiny"));
// middle ware activation
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 150,
  })
);
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("./public"));
app.use(fileUpload());

// router activation
app.use("/api/v1/image", Image);
app.use("/api/v1/songs", Song);

// This is the callback URL route for the ML server
app.post("/callback", (req, res) => {
  console.log("Received callback:", req.body);

  // Emit the event with the received data
  eventEmitter.emit("callbackReceived", req.body);

  res.status(200).send("Callback received!");
});

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.error(error); // It's a good practice to log the error for debugging.
  }
};

start();
