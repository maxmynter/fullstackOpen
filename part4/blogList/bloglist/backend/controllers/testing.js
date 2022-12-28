const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const testingRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
const middleware = require("../utils/middleware");

testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

testingRouter.post("/user", async (request, response) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

testingRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id });
});

testingRouter.post(
  "/blog",
  middleware.userExtractor,
  async (request, response) => {
    console.log("request.user", request.user);
    try {
      const loggedInUser = request.user;
      if (loggedInUser) {
        const blog = new Blog({ ...request.body, creator: loggedInUser });
        const result = await blog.save();
        return response.status(201).json(result);
      } else {
        return response.status(401).json({ error: "Authentication Error" });
      }
    } catch (error) {
      if (error._message === "Blog validation failed") {
        return response.status(400).json({ error: "Blog validation failed" });
      }
      return response.status(400).json({ error });
    }
  }
);

module.exports = testingRouter;
