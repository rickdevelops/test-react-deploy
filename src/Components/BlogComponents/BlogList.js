import { Link } from "react-router-dom";
const BlogList = ({ blogs }) => {
  // const BlogList = ({ blogs, title }) => {
  // const blogs=props.blogs;
  // console.log(props,blogs);

  return (
    <div className="blog-list">
      {/* <h1>{title}</h1> */}
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blog/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            {/* <button onClick={() => handleDelete(blog.id)}>Delete</button> */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

/*
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blog/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
*/
