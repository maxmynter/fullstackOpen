const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator");
  return response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  try {
    const loggedInUser = request.user;
    const blog = new Blog({ ...request.body, creator: loggedInUser });
    const result = await blog.save();
    return response.status(201).json(result);
  } catch (error) {
    return response.status(401).json({ error: "Authentication Error" });
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
  response.status(204).end();
});

module.exports = blogsRouter;
