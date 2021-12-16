import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log("UseEffect Ran");
    // console.log("UseEffect Ran",blogs.length);
    const abortCont = new AbortController();

    // setTimeout(() => {
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (res.status !== 200) {
          throw Error("could not fetch from the resource");
        }
        return res.json();
      })
      .then((data) => {
        //   console.log(data);
        setData(data);
        setPending(false);
        setError(null);
      })
      .catch((err) => {
        //   console.log(err.message);
        if (err.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          setPending(false);
          setError(err.message);
        }
      });
    // }, 2000);
    return () => abortCont.abort();
    // setBlogsLength(blogs.length);
  }, [url]);

  return { data, pending, error };
};

export default useFetch;
