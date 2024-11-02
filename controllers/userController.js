const db = require("../db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  console.log("Usernames: ", usernames);
  // res.send("Usernames: " + usernames.map((user) => user.username).join(", "));
  res.render("index", { usernames: usernames });
}

async function createUsernameGet(req, res) {
  res.render("form");
  res.end();
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function searchUserGet(req, res) {
  const searchQuery = req.query.search;
  console.log(req.query.search);
  let searchResult = await db.getUsername(searchQuery);
  let r = "";
  searchResult.forEach((res) => {
    r += res.username + " , ";
  });
  res.end(r);
}

async function deleteUsers(req, res) {
  await db.deleteUsers();
  res.redirect("/");
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  searchUserGet,
  deleteUsers,
};
