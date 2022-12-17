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

afterAll(() => {
  mongoose.connection.close();
});
