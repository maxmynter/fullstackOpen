const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator");
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: "authentication missing or invalid" });
    }
    const loggedInUser = await User.findById(decodedToken.id);
    const blog = new Blog({ ...request.body, creator: loggedInUser });
    const result = await blog.save();
    return response.status(201).json(result);
  } catch (error) {
    return response.status(401).json({ error: "Authentication Error" });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: "authentication missing or invalid" });
    }

    const blogToDelete = await Blog.findById(request.params.id);

    if (decodedToken.id.toString() === blogToDelete.creator.toString()) {
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
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(204).end();
});

module.exports = blogsRouter;
