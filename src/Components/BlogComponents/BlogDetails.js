import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();

  const {
    data: blog,
    pending,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const history = useHistory();

  const handleDelete = () => {
    // console.log("id", id);
    fetch("http://localhost:8000/blogs/" + id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {/* <h2>Blog Details - {id}</h2> */}
      {error && <div> {error} </div>}
      {!error && pending && <div> Loading... </div>}
      {blog && (
        <div className="card">
          <h2>{blog.title}</h2>
          <div>Written by {blog.author}</div>
          <p>{blog.body}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
