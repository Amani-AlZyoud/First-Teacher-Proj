const pool = require("../config/dbConn");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT * FROM users WHERE active = '1' AND role_id <> '1' ORDER BY user_id DESC"
    );
    res.status(201).json({ success: users.rows });
  } catch (err) {
    console.log(err.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await pool.query(
      "UPDATE users SET active = '0' WHERE user_id = $1",
      [id]
    );
    res.status(201).json({ success: "deleted successfully!" });
  } catch (err) {
    console.log(err.message);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { username, school_name, user_img } = req.body;
  try {
    const users = await pool.query(
      "UPDATE users SET username = $2, school_name = $3, user_img = $4 WHERE user_id = $1 AND active = '1'",
      [id, username, school_name, user_img]
    );
    res.status(201).json({ success: "updated successfully!" });
  } catch (err) {
    console.log(err.message);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await pool.query(
      "SELECT * FROM users WHERE user_id = $1 AND active = '1'",
      [id]
    );
    if (users.rows.length === 0) {
      res.status(201).json({ empty: "NO DATA" });
    }
    res.status(201).json({ success: users.rows[0] });
  } catch (err) {
    console.log(err.message);
  }
};

const userPayment = async (req, res) => {
  const { id } = req.params;
  const {
    fname,
    lname,
    subscribtion,
    cardname,
    cardnumber,
    cardcvv,
    cardexpiry,
  } = req.body;
  const hashedCardNumber = bcrypt.hashSync(cardnumber, 10);
  const hashedCardCVV = bcrypt.hashSync(cardcvv, 10);
  const hashedCardName = bcrypt.hashSync(cardname, 10);
  const hashedCardExpiry = bcrypt.hashSync(cardexpiry, 10);
  const startDate = new Date();

  let subscriptionDuration = 12;
  if (subscribtion == "semester") subscriptionDuration = 5;
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + subscriptionDuration,
    startDate.getDate()
  );

  try {
    const pay = await pool.query(
      "INSERT INTO payment (fname, lname, subscribtion, cardname, cardnumber, cardcvv, cardexpiry,subscribtion_end, user_id) VALUES ($1, $2, $3 , $4 , $5, $6, $7, $8, $9) RETURNING *",
      [
        fname,
        lname,
        subscribtion,
        hashedCardName,
        hashedCardNumber,
        hashedCardCVV,
        hashedCardExpiry,
        endDate,
        id,
      ]
    );

    const user = await pool.query(
      "UPDATE users SET account = 'YES' WHERE user_id = $1 AND active = '1'",
      [id]
    );

    res.status(201).json({ success: "Payment Done" });
  } catch (err) {
    console.log(err.message);
  }
};

const statistics = async (req, res) => {
  try {
    const teachers = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role_id = 2 AND active = '1'"
    );
    const headmasters = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role_id = 3 AND active = '1'"
    );
    res.status(201).json({ success: {teachersCount: teachers.rows[0].count, headmastersCount: headmasters.rows[0].count } });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
  userPayment,
  statistics,
};
