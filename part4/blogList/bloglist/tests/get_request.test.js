const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../backend/app");

const api = supertest(app);

const Blogs = require("../backend/models/blogs");
const helper = require("./test_helpers");

beforeEach(async () => {
  await Blogs.deleteMany({});
  await Blogs.insertMany(helper.initialBlogs);
});

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("Correct number of blogs in database", async () => {
  const allBlogs = JSON.parse((await api.get("/api/blogs")).text);
  expect(allBlogs).toHaveLength((await helper.blogsInDb()).length);
});

test("Identifier property 'id' is defined.", async () => {
  const blogEntries = await Blogs.find({});
  blogEntries.forEach((entry) => expect(entry.id).toBeDefined());
});

test("Can POST new blog entry", async () => {
  const newBlogEntry = {
    title: "New Blog Post",
    author: "Me",
    url: "www.test.de",
  };

  await api.post("/api/blogs").send(newBlogEntry).expect(201);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("If property 'Likes' is missing from new entry, default it to zero", async () => {
  const newBlogEntry = {
    title: "Blog Post without likes",
    author: "Unliked",
    url: "www.nolikes.de",
  };
  await api.post("/api/blogs").send(newBlogEntry).expect(201);

  const newBlogEntryFromBackend = await Blogs.find({
    title: "Blog Post without likes",
  });
  expect(newBlogEntryFromBackend[0].likes).toBe(0);
});

test("Receive error 400 for POST of new blog entry without title", async () => {
  const blogEntryWithoutTitle = { author: "No Title", url: "www.nolikes.de" };
  await api.post("/api/blogs").send(blogEntryWithoutTitle).expect(400);
});

test("Receive error 400 for POST of new blog entry without url", async () => {
  const blogEntryWithoutURL = {
    title: "Cannot post Blog without URL",
    author: "No Title",
  };
  await api.post("/api/blogs").send(blogEntryWithoutURL).expect(400);
});

test("Can DELETE Blog entry", async () => {
  const toDeleteBlog = await helper.blogsInDb();
  await api.delete(`/api/blogs/${toDeleteBlog[0].id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);
});

test("Can update Blog entry", async () => {
  const blogsInDB = await helper.blogsInDb();
  const toUpdateBlog = blogsInDB[0];
  const updatedLikes = {
    likes: toUpdateBlog.likes + 5,
  };
  await api.put(`/api/blogs/${toUpdateBlog.id}`).send(updatedLikes).expect(204);
  const blogsAtEnd = await helper.blogsInDb();
  const updatedBlog = blogsAtEnd.find((blog) => blog.id === toUpdateBlog.id);
  console.log(updatedBlog);
  expect(updatedBlog.likes).toBe(toUpdateBlog.likes + 5);
});

afterAll(() => {
  mongoose.connection.close();
});
