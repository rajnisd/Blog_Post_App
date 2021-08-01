/**
 * TODO: Finish submitNewPost function to submit form data to the API
 */

const API_URL = "http://localhost:3000/api/posts";

const submitNewPost = () => {
  // HINT: Use FormData to store data to send over
  // HINT: Redirect the user to home page after successful submission
  console.log("inside submit New Post");
  let formData = new FormData();
  const title = document.getElementById("form-post-title").value;
  const content = document.getElementById("form-post-content").value;
  const postImage = document.getElementById("form-post-image").files[0];

  formData.append("title", title);
  formData.append("content", content);
  formData.append("post-image", postImage);

  fetch(API_URL, {
    method: "POST",
    body: formData,
  }).then(() => {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
    console.log("add post workig");
  });
};
