const listHelper = require("../backend/utils/list_helper");

describe("Test list_helpers", () => {
  const blogWithMostLikes = {
    title: "M.J. is back",
    author: "MJ",
    url: "www.mj.de",
    likes: 20,
  };
  const blogs = [
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

  test("dummy returns one", () => {
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });

  test("totalLikes counts total likes", () => {
    expect(listHelper.totalLikes(blogs)).toBe(21);
  });

  test("favouriteBlog returns blog with most likes", () => {
    expect(listHelper.favouriteBlog(blogs)).toEqual(blogWithMostLikes);
  });

  test("mostBlogs returns the author of the most blogs and number of publications", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "MJ",
      blogs: 3,
    });
  });

  test("mostLikes returns author and Likes of author with most likes", () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "MJ",
      likes: 21,
    });
  });
});
