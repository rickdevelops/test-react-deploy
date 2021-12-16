import "../../CSS/Create.css";
import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [pending, setPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setPending(true);
    console.log(blog);

    setTimeout(() => {
      fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      }).then(() => {
        setPending(false);
        history.push("/");
        console.log("New Blog Added!");
      });
    }, 2000);
  };

  return (
    <div className="create">
      <h1>Add a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <label>Blog Title: </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
        />
        <label>Blog Body: </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <label>Blog Author: </label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">Mario</option>
          <option value="yoshi">Yoshi</option>
        </select>
        {!pending && <button>Add Blog</button>}
        {pending && <button>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
