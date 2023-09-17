require("dotenv").config();

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
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");

//router imports
const Song = require("./routes/songRoute");
const Image = require("./routes/imageRoute");

const allowedOrigins = [
  "https://moodwave-ai-frontend.onrender.com",
  "http://localhost:3000",
];
app.use(cors({ origin: "http://localhost:3000" }));
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

app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.json());
app.use(express.static("./public"));
app.use(fileUpload());
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
// router activation
app.use("/api/v1/image", Image);
app.use("/api/v1/songs", Song);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.error(error); // It's a good practice to log the error for debugging.
  }
};

start();
