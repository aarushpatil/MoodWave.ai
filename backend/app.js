require("dotenv").config();
require("express-async-errors");

// express webserver main import
const express = require("express");
const app = express();

//middleware imports
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

//router imports
const Posts = require("./routes/postsRoutes");
const Auth = require("./routes/authRoutes");

// mongodb connecton import
const connectDB = require("./db/connect");

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
    origin: "https://capybaraspace.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("./public"));
app.use(fileUpload());

// router activation
app.use("/api/v1/auth", Auth);
app.use("/api/v1/posts", Posts);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.error(error); // It's a good practice to log the error for debugging.
  }
};

start();
