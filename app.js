let express = require("express");
let path = require("path");

const userController = require("./controllers/userController");
let app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  await userController.getUsernames(req, res);
  console.log("usernames will be logged here - wip");
  res.end();
});

app.get("/new", (req, res) => {
  userController.createUsernameGet(req, res);
});

app.post("/new", async (req, res) => {
  await userController.createUsernamePost(req, res);
  console.log("username to be saved: ", req.body.username);
});

app.get("/search", async (req, res) => {
  await userController.searchUserGet(req, res);
});

app.get("/delete", async (req, res) => {
  await userController.deleteUsers(req, res);
});

app.listen(3000, async (req, res) => {
  console.log("listening on port 3000");
});
