const { connection } = require("../config/db");

const getUsers = async (req, res) => {
  try {
    const query  = await connection;
    const [rows] = await query.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsersById = async (req, res) => {
  try {
    const query = await connection;
    const { id } = req.params;
    const [result] = await query.query("SELECT * FROM users WHERE id = ?", [id]);
    console.log(result);
    if(result.length > 0) res.status(200).json({ message: "User found successfully",
      user: result
    });
    else res.status(400).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
  }
};

const createUsers = async (req, res) => {
  try {
    const { email, name, age } = req.body;
    if(!email || !name || !age) res.status(400).json({ message: "Please fill all fields" });
    const query = await connection;
    const [status] = await query.query(
      `SELECT * FROM users WHERE email = '${email}'`
    )
    if(status.length === 0)
    {
      const result = await query.query(
        `INSERT INTO users (name, email, age) VALUES ('${name}','${email}',${age})`,
      );
      res.status(200).json({
        message: "User created successfully",
        user: { id: result.insertId, name, email, age },
      });
    }
    res.status(400).json({ message: "User already exists" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserPut = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    if(!user.name || !user.email || !user.age) res.status(404).json({
      message: "Please fill all fields"
    })
    const query = await connection;
    await query.query(
      `UPDATE users SET name = ?,
      email = ?,
      age = ?
      WHERE id = ${req.params.id};`, [user.name, user.email, user.age]);
    res.status(200).json({
      message: "User information updated successfully"
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserPatch = async (req, res) => {
  try {
    const user = req.body;
    const query = await connection;
    const [ toChange ] = await query.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
    const updatedUser = { ...toChange[0], ...user };
    await query.query(
      `UPDATE users SET name = ?,
      email = ?,
      age = ?
      WHERE id = ${req.params.id};`, [updatedUser.name, updatedUser.email, updatedUser.age]);
    res.status(200).json({
      message: "User information updated successfully"
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const query = await connection;
    const { id } = req.params;
    const [result] = await query.query("DELETE FROM users WHERE id = ?", [id]);
    console.log(result);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUsers, getUsersById, createUsers, deleteUser, updateUserPut, updateUserPatch };
