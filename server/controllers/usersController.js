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

const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { username, school_name, user_img} = req.body;
  try {
    const users = await pool.query("UPDATE users SET username = $2, school_name = $3, user_img = $4 WHERE user_id = $1 AND active = '1'", 
    [id, username, school_name, user_img]);
    res.status(201).json({ 'success': "updated successfully!" });
  } catch (err) {
    console.log(err.message);
  }
}

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await pool.query("SELECT * FROM users WHERE user_id = $1 AND active = '1'", [id]);
    if(users.rows.length === 0) {
      res.status(201).json({ 'empty': "NO DATA" });
    }
    res.status(201).json({ 'success': users.rows[0] });
  } catch (err) {
    console.log(err.message);
  }

}

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser,
    getUser
}