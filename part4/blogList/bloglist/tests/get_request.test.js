const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../backend/app");

const api = supertest(app);

const Blogs = require("../backend/models/blogs");
const helper = require("./test_helpers");

let token;

beforeAll(async () => {
  //Wait until connection of app is ready.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  api
    .post("/api/login")
    .send({ username: "M123", password: "123" })
    .then((response) => {
      token = response.body.token;
    });
});

beforeEach(async () => {
  await Blogs.deleteMany({});
  await Blogs.insertMany(helper.initialBlogs);
}, 100000);

describe("Misc. Requests", () => {
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

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlogEntry)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("If property 'Likes' is missing from new entry, default it to zero", async () => {
    const newBlogEntry = {
      title: "Blog Post without likes",
      author: "Unliked",
      url: "www.nolikes.de",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlogEntry)
      .expect(201);

    const newBlogEntryFromBackend = await Blogs.find({
      title: "Blog Post without likes",
    });
    expect(newBlogEntryFromBackend[0].likes).toBe(0);
  });

  test("Receive error 400 for POST of new blog entry without title", async () => {
    const blogEntryWithoutTitle = { author: "No Title", url: "www.nolikes.de" };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(blogEntryWithoutTitle)
      .expect(400);
  });

  test("Receive error 400 for POST of new blog entry without url", async () => {
    const blogEntryWithoutURL = {
      title: "Cannot post Blog without URL",
      author: "No Title",
    };
    await api
      .post("/api/blogs")
      .send(blogEntryWithoutURL)
      .set("Authorization", `bearer ${token}`)
      .expect(400);
  });

  test("Can DELETE Blog entry", async () => {
    const toDeleteEntry = {
      title: "Title",
      author: "author",
      url: "www.nolikes.de",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(toDeleteEntry)
      .expect(201);

    const blogsAfterInsert = await helper.blogsInDb();

    const toDeleteEntryID = (
      await Blogs.findOne({
        title: "Title",
      })
    )._id.toString();
    await api
      .delete(`/api/blogs/${toDeleteEntryID}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(blogsAfterInsert.length - 1);
  });

  test("Can update Blog entry", async () => {
    const blogsInDB = await helper.blogsInDb();
    const toUpdateBlog = blogsInDB[0];
    const updatedLikes = {
      likes: toUpdateBlog.likes + 5,
    };
    await api
      .put(`/api/blogs/${toUpdateBlog.id}`)
      .send(updatedLikes)
      .expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === toUpdateBlog.id);
    expect(updatedBlog.likes).toBe(toUpdateBlog.likes + 5);
  });

  test("POST of a new blog entry fails with status 401 if no token authentication is provided", async () => {
    const newBlogEntry = {
      title: "New Sample Post",
      author: "Matthew",
      url: "www.me.de",
    };
    await api.post("/api/blogs").send(newBlogEntry).expect(401);
  });
});
afterAll(async () => {
  // delete user test blogs
  mongoose.connection.close();
});
