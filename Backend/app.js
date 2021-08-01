const express = require("express"); //imports express framework into app.js
const app = express(); // creates an application , server
var multer = require("multer");
const Post = require("./api/models/post");

//var upload = multer({dest:'uploads/'})
const postData = new Post();

var storage = multer.diskStorage({
  destination: "uploads",
  //  function (req, file, cb) {
  //   cb(null, 'uploads/')
  // },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimeType) => {
  switch (mimeType) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
  }
};

var upload = multer({ storage: storage });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/posts/:id", (req, res) => {
  //res.send(postData.getIndividualPost(req.params.id));
  const post_id = req.params.id;
  const foundPost = postData.getIndividualPost(post_id);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/api/posts", (req, res) => {
  res.status(200).send(postData.readData());
});

app.get("/", (req, res) => {
  //"/"=> implies for all url , get request sent to server
  res.status(200).send("hello world");
});

app.post("/api/posts", upload.single("post-image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  /* below statement is very important while working on windows
   * any path on windows has back slash only
   * but to make file accessable through url it must be converted to forward slash
   * The "g" after the regular expression is an option or flag that performs a global search,
   * looking in the whole string and returning all matches.
   */
  const imageUrl = req.file.path.replace(/\\/g, "/");

  const post = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    //"post_image":`uploads\\${req.file.fieldname}-${Date.now()}${getExt(req.file.mimetype)}`,//uploads\post-image-1626522925429.jpeg
    //"post_image":'uploads/'+req.file.fieldname+'-'+Date.now()+getExt(req.file.mimetype),
    //"post_image": req.body["post-image"],
    post_image: imageUrl, //req.file.path,
    added_date: `${Date.now()}`,
  };
  console.log(post);
  postData.addNewPost(post);
  res.status(201).send("ok");
  // res.status(200).send(postData.addNewPost(post));
});

app.listen(3000, () => console.log("listening on http://localhost:3000")); // app is running  at 3000 port
