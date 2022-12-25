const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  let token = null;
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken) {
    return response
      .status(401)
      .json({ error: "authentication missing or invalid" });
  }
  request.token = decodedToken;
  next();
};

const userExtractor = async (request, response, next) => {
  const loggedInUser = await User.findById(request.token.id);
  request.user = loggedInUser;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
