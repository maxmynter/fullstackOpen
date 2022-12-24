const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (password.length < 3 || username.length < 3) {
    return response.status(403).json({
      error:
        "Password and username must each be at least three characters long.",
    });
  }

  if (await User.findOne({ username })) {
    return response.status(403).json({ error: "Username already taken" });
  }

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

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  return response.json(users.map((usr) => usr.toJSON()));
});

module.exports = usersRouter;
