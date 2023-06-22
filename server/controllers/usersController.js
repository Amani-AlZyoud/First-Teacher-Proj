const pool = require("../config/dbConn");

const getAllUsers = async (req, res) => {
    try {
        const users = await pool.query(
          "SELECT * FROM users WHERE active = '1' AND role_id = '1'"
        );
        res.json(users.rows);
      } catch (err) {
        console.log(err.message);
      }
}

const deleteUser = async (req, res) => {

}

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await pool.query("SELECT * FROM users WHERE user_id = $1 AND active = '1'", [id]);
    res.status(201).json({ 'success': users.rows[0] });
  } catch (err) {
    console.log(err.message);
  }

}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}