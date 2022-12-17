const Blog = require("../backend/models/blogs");

const blogWithMostLikes = {
  title: "M.J. is back",
  author: "MJ",
  url: "www.mj.de",
  likes: 20,
};
const initialBlogs = [
  {
    title: "WIll M.J dissapear",
    author: "Not MJ",
    url: "www.notMJ.de",
    likes: 0,
  },
  { title: "M.J. is gone", author: "MJ", url: "www.mj.de", likes: 1 },
  { title: "M.J. is away", author: "MJ", url: "www.mj.de", likes: 0 },
  blogWithMostLikes,
];

const blogsInDb = async () =>
  (await Blog.find({})).map((blog) => blog.toJSON());

module.exports = {
  initialBlogs,
  blogWithMostLikes,
  blogsInDb,
};
