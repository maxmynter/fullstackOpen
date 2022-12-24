const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Blog = require("../models/blogs");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator");
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: "authentication missing or invalid" });
  }
  const loggedInUser = await User.findById(decodedToken.id);
  const blog = new Blog({ ...request.body, creator: loggedInUser });
  const result = await blog.save();
  return response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(204).end();
});

module.exports = blogsRouter;
