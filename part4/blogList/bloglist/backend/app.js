const express = require("express");
require("express-async-errors");
const app = express();
const middleware = require("./utils/middleware");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const loginRouter = require("./controllers/login");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const logger = require("./utils/logger");
logger.info("connecting to Mongodb. URL : ", config.MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("connected to MongoDB");
  } catch (error) {
    logger.error("error connection to MongoDB:", error.message);
  }
};

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);

app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", middleware.userExtractor, testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
