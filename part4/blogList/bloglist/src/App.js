import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = `http://localhost:${process.env.REACT_APP_PORT_BACKEND}/`;

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

const App = () => {
  const [blogEntries, setBlogEntries] = useState([]);

  useEffect(() => {
    axios.get(baseURL + "api/blogs").then((response) => {
      setBlogEntries(response.data);
    });
  }, []);

  return (
    <>
      <h1>My saved Blogs: </h1>
      <Blogs blogEntries={blogEntries} />
    </>
  );
};

export default App;
