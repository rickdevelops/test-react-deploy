const Helper = () => {
  return <div className="helper"></div>;
};

export default Helper;

// Validate Email
export const validateEmail = (email) => {
  // console.log(email)
  const re =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // console.log(re.test(email));
  return re.test(email);
};

// Get the last item from the URL
export const getLastItemFromUrl = (url) => {
  const urlArray = url.split("/");
  return urlArray[urlArray.length - 1];
};

// Get Subject and Topic From Url
export const getSubjectAndTopicFromUrl = () => {
  const url = window.location.href;
  const urlArray = url.split("/");
  const subject = urlArray[urlArray.length - 2];
  const topic = urlArray[urlArray.length - 1];
  return { subject, topic };
};

// Shuffle Array Sent
export const shuffleArray = (array) => {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
