const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogs");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator");
  return response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
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
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    try {
      const blogToDelete = await Blog.findById(request.params.id);

      if (request.user.id === blogToDelete.creator.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        return response.status(204).end();
      }
      return response
        .status(401)
        .json({ error: "Only the creator of an entry can delete entries" });
    } catch (error) {
      return response
        .status(401)
        .json({ error: "Authentication Error: " + error });
    }
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  return response.status(204).end();
});

module.exports = blogsRouter;
