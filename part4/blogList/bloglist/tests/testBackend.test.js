const listHelper = require("../backend/utils/list_helper");
const { initialBlogs, blogWithMostLikes } = require("./test_helpers");

describe("Test list_helpers", () => {
  test("dummy returns one", () => {
    const result = listHelper.dummy(initialBlogs);
    expect(result).toBe(1);
  });

  test("totalLikes counts total likes", () => {
    expect(listHelper.totalLikes(initialBlogs)).toBe(21);
  });

  test("favouriteBlog returns blog with most likes", () => {
    expect(listHelper.favouriteBlog(initialBlogs)).toEqual(blogWithMostLikes);
  });

  test("mostBlogs returns the author of the most blogs and number of publications", () => {
    expect(listHelper.mostBlogs(initialBlogs)).toEqual({
      author: "MJ",
      blogs: 3,
    });
  });

  test("mostLikes returns author and Likes of author with most likes", () => {
    expect(listHelper.mostLikes(initialBlogs)).toEqual({
      author: "MJ",
      likes: 21,
    });
  });
});
