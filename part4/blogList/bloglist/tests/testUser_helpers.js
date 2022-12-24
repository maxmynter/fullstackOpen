const User = require("../backend/models/users");

const initialUsers = [
  {
    name: "Michael Jackson",
    username: "MJ2009",
    passwordHash: "halloMJ",
  },
  {
    name: "Sarah Connor",
    username: "SConnor",
    passwordHash: "imback",
  },
  {
    name: "Charles Bukowski",
    username: "Bukowitz",
    passwordHash: "thisisfunny",
  },
];

const usersInDb = async () =>
  (await User.find({})).map((user) => user.toJSON());

module.exports = {
  usersInDb,
  initialUsers,
};
