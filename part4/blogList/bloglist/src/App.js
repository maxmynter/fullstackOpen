import { useState, useEffect } from "react";
import axios from "axios";
import Blogs from "./components/blogEntries";
import baseURL from "./utils/config";

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
