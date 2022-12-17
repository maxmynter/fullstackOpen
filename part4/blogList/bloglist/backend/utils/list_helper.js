var _ = require("lodash");

const dummy = (blogs) => {
  // Dummy function for learning about tests
  return 1;
};

const totalLikes = (listOfBlogposts) =>
  listOfBlogposts
    .map((blogEntry) => blogEntry.likes)
    .reduce((accum, currVal) => accum + currVal);

const favouriteBlog = (listOfBlogposts) =>
  listOfBlogposts.reduce((prev, curr) =>
    prev.likes >= curr.likes ? prev : curr
  );

const mostBlogs = (listOfBlogposts) => {
  const publicationsOfAuthor = _.countBy(
    listOfBlogposts,
    (blog) => blog.author
  );
  const mostPublishedAuthor = Object.keys(publicationsOfAuthor).reduce(
    (curr, prev) =>
      publicationsOfAuthor[curr] >= publicationsOfAuthor[prev] ? curr : prev
  );
  return {
    author: mostPublishedAuthor,
    blogs: publicationsOfAuthor[mostPublishedAuthor],
  };
};

const mostLikes = (listOfBlogposts) => {
  let likesOfAuthor = listOfBlogposts.reduce((likesOfAuthor, blogpost) => {
    if (likesOfAuthor[blogpost.author])
      likesOfAuthor[blogpost.author] += blogpost.likes;
    else likesOfAuthor[blogpost.author] = blogpost.likes;
    return likesOfAuthor;
  }, {});

  const mostLikedAuthor = Object.keys(likesOfAuthor).reduce((prev, curr) =>
    likesOfAuthor[curr] >= likesOfAuthor[prev] ? curr : prev
  );
  return { author: mostLikedAuthor, likes: likesOfAuthor[mostLikedAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
