import BlogList from "./BlogList";
import "../../CSS/Home.css";
import useFetch from "./useFetch";

const Home = () => {
  const title = "Blog List";
  // const AuthorTitle = "mario";
  // const [blogs, setBlogs] = useState([
  //   { title: "My new website", body: "lorem ipsum...", author: "mario", id: 1 },
  //   { title: "Welcome party!", body: "lorem ipsum...", author: "yoshi", id: 2 },
  //   {
  //     title: "Web dev top tips",
  //     body: "lorem ipsum...",
  //     author: "mario",
  //     id: 3,
  //   },
  //   {
  //     title: "Web dev top tips",
  //     body: "lorem ipsum...",
  //     author: "mario",
  //     id: 4,
  //   },
  //   {
  //     title: "Web dev top tips",
  //     body: "lorem ipsum...",
  //     author: "mario",
  //     id: 5,
  //   },
  // ]);
  // const [blogs, setBlogs] = useState(null);
  // const [pending, setPending] = useState(true);
  // const [error, setError] = useState(null);
  // let [blogsLength, setBlogsLength] = useState(blogs.length);

  // const handleDelete = (id) => {
  // const newBlogs = blogs.filter((blog) => blog.id !== id);
  // setBlogsLength(newBlogs.length)
  // setBlogs(newBlogs);
  // };

  const {
    data: blogs,
    pending,
    error,
  } = useFetch("http://localhost:8000/blogs");
  // useEffect(() => {
  //   // console.log("UseEffect Ran");
  //   // console.log("UseEffect Ran",blogs.length);
  //   // setTimeout(() => {
  //   fetch("http://localhost:8000/blogs")
  //     .then((res) => {
  //       if (res.status != 200) {
  //         throw Error("could not fetch from the resource");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setBlogs(data);
  //       setPending(false);
  //       setError(null);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       setPending(false);
  //       setError(err.message);
  //     });
  //   // }, 2000);
  //   // setBlogsLength(blogs.length);
  // }, []);

  return (
    <div className="home">
      {error && <div> {error} </div>}
      {!error && pending && <div> Loading... </div>}
      {blogs && <BlogList blogs={blogs} title={title} />}
      {/* {blogs && (
        <BlogList blogs={blogs} title={title} handleDelete={handleDelete} />
      )}
      {blogs && (
        <BlogList
          blogs={blogs.filter((blog) => blog.author === AuthorTitle)}
          title={AuthorTitle}
          handleDelete={handleDelete}
        />
      )} */}
      {/* <p>Length of the Blogs: {blogsLength}</p> */}
    </div>
  );
};

export default Home;
