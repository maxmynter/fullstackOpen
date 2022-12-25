const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../backend/app");

const api = supertest(app);

const User = require("../backend/models/users");
const userTestHelper = require("./testUser_helpers");
beforeAll(async () => {
  //Wait until connection of app is ready.
  await new Promise((resolve) => setTimeout(resolve, 1000));
});
beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(userTestHelper.initialUsers);
}, 100000);
describe("User Creation", () => {
  test("Cannot create user with existing username", async () => {
    const duplicateUser = {
      name: "Charles Bukowski",
      username: "Bukowitz",
      password: "thisisfunny",
    };
    await api.post("/api/users").send(duplicateUser).expect(403);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
