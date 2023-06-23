const pool = require("../config/dbConn");

const setLesson = async (req, res) => {
  const id = req?.user?.user_id;
  const data = req.body.lesson;
  const mainform = [data[0]];
  const headform = [data[1]];
  const table_one = data[2];
  const table_two = data[3];
  const sql = "INSERT INTO lessons (mainform, headform, table_one, table_two, user_id) VALUES ($1, $2, $3, $4, $5)";
  const lessons = await pool.query( sql, [mainform, headform, table_one, table_two, id]);
  
  res.json({'success':lessons.rows});
};

const getUserLessons = async (req, res) => {
  const id = req?.user?.user_id;
  const sql = "SELECT * FROM lessons WHERE user_id = $1";
  const lessons = await pool.query( sql, [id]);
  
  res.json({'success':lessons.rows});
};

const getLesson = async (req, res) => {
  const id = req?.user?.user_id;
  const lesson_id = req.params.id;
  const sql = "SELECT * FROM lessons WHERE user_id = $1 AND lesson_id = $2";
  const lessons = await pool.query( sql, [id, lesson_id]);
  res.json({'success': lessons.rows[0]});
};


module.exports = {
  setLesson,
  getLesson,
  getUserLessons
};
