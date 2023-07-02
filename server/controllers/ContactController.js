const pool = require("../config/dbConn");

const AddMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const Message = await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    res.status(201).json({ success: "message add to the DB" });
  } catch (err) {
    console.log(err.message);
  }
};
const getmessages = async (req, res) => {
  try {
    const messages = await pool.query("SELECT * FROM messages WHERE reply = '0'");
    res.status(201).json({ success: messages.rows });
  } catch (err) {
    console.log(err.message);
  }
};
const replymessage = async (req, res) => {
  const {id} = req.params;
  try {
    const messages = await pool.query("UPDATE messages SET reply = '1' WHERE message_id = $1", [id]);
    res.status(201).json({ success: "updated successfully"});
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  AddMessage,
  getmessages,
  replymessage
};
