const Blogs = ({ blogEntries }) => {
  return (
    <>
      {blogEntries.map((blog) => (
        <div key={`${blog.title}-wrapper`}>
          <div key={`${blog.title}-row-1`}>
            {blog.title} by {blog.author} --- {blog.likes} Likes
          </div>
          <div key={`${blog.title}-row-2`}>{blog.url}</div>
        </div>
      ))}
    </>
  );
};

export default Blogs;
