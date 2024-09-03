const { connection } = require("../config/db");

const getUsers = async (req, res) => {
  try {
    console.log(req.body);
    const pool = await connection;
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(200).json({rows});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getUsersById = () => {};

const createUsers = async (req, res) => {
  try {
    const { email, name, age } = req.body;
    const pool = await connection;
    const [result] = await pool.query(
      "INSERT INTO users (name, email, age) VALUES (?,?,?)",
      [name, email, age]
    );
    console.log(result);
    res.status(200).json({
      message: "User created successfully",
      user: { id: result.insertId, name, email, age },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const updateUserPut = () => {};

// const updateUserPatch = () => {};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await connection;
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    console.log(result);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUsers, createUsers, deleteUser };
