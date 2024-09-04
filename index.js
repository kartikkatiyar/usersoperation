const express = require("express");
const dotenv = require("dotenv");
const { getUsers, createUsers, deleteUser, getUsersById, updateUserPut, updateUserPatch } = require("./controllers/users");
const { connection } = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/users/get", getUsers);
app.get("/api/users/get/:id", getUsersById);
app.post("/api/users/create", createUsers);
app.put("/api/users/update-put/:id", updateUserPut);
app.patch("/api/users/update-patch/:id", updateUserPatch);
app.delete("/api/users/delete/:id", deleteUser);

const port = process.env.PORT || 3000;

connection.then(() => {
  console.log("db connected");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = app;
