const pool = require("../config/dbConn");
const pdf = require("html-pdf");
const pdfTemplate = require("../Document/plan");
const options = {
  height: "15.5in",
  width: "8in",
};
const setLesson = async (req, res) => {
  const id = req?.user?.user_id;
  const data = req?.body?.lesson;
  const mainform = data ? [data[0]] : {};
  const headform = data ? [data[1]] : {};
  const table_one = data ? data[2] : [];
  const table_two = data ? data[3] : [];
  const sql =
    "INSERT INTO lessons (mainform, headform, table_one, table_two, user_id) VALUES ($1, $2, $3, $4, $5)";
  const lessons = await pool.query(sql, [
    mainform,
    headform,
    table_one,
    table_two,
    id,
  ]);

  res.json({ success: lessons.rows });
};

const getUserLessons = async (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT * FROM lessons WHERE user_id = $1 AND sign = '0' ORDER BY lesson_id DESC";
  const lessons = await pool.query(sql, [id]);
  res.json({ success: lessons.rows });
};

const getLesson = async (req, res) => {
  const id = req?.user?.user_id;
  const lesson_id = req.params.id;
  const sql =
    "SELECT * FROM lessons WHERE user_id = $1 AND lesson_id = $2 ORDER BY lesson_id DESC";
  const lessons = await pool.query(sql, [id, lesson_id]);
  if (lessons.rows.length > 0) {
    const mainform = lessons.rows[0].mainform[0];
    const headform = lessons.rows[0].headform[0];
    const table_one = lessons.rows[0].table_one;
    const table_two = lessons.rows[0].table_two;
    const sign = lessons.rows[0].sign;
    res.json({ success: { mainform, headform, table_one, table_two, sign } });
  } else {
    res.json({ message: "id not found" });
  }
};

const deleteLesson = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.json({ message: "ID required." });

  const lesson = await pool.query("DELETE FROM lessons WHERE lesson_id = $1", [
    id,
  ]);

  res.json({ success: `Lesson ID ${id} Deleted.` });
};

const updateLesson = async (req, res) => {
  const id = req?.user?.user_id;
  const lesson_id = req.params.id;
  const data = req.body.lesson;
  const mainform = [data[0]];
  const headform = [data[1]];
  const table_one = data[2];
  const table_two = data[3];
  const sql =
    "UPDATE lessons SET mainform = $3, headform = $4, table_one = $5, table_two = $6 WHERE user_id = $1 AND lesson_id = $2";
  const lessons = await pool.query(sql, [
    id,
    lesson_id,
    mainform,
    headform,
    table_one,
    table_two,
  ]);

  res.json({ success: lessons.rows[0] });
};

const createPDFLesson = (req, res) => {
  pdf
    .create(pdfTemplate(req.body), options)
    .toFile("controllers/result.pdf", (err) => {
      if (err) {
        res.send("error creating");
      }
      res.sendFile(`${__dirname}/result.pdf`);
    });
};

const signPlan = async (req, res) => {
  const lesson_id = req.params.id;
  const { sign } = req.body;
  const sql = "UPDATE lessons SET sign = $2 WHERE lesson_id = $1";
  const lessons = await pool.query(sql, [lesson_id, sign]);
  res.json({ success: "Done sign" });
};

const SignedPlans = async (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT * FROM lessons WHERE user_id = $1 AND sign <> '0' ORDER BY lesson_id DESC";
  const lessons = await pool.query(sql, [id]);
  res.json({ success: lessons.rows });
};

const WeekPlans = async (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT * FROM lessons WHERE user_id = $1 AND sign = '0' ORDER BY lesson_id DESC";
  const lessons = await pool.query(sql, [id]);
  const weekPlans = [];
  lessons?.rows.map((p) => {
    const result = isInCurrentWeek(p.table_two[p.table_two.length - 1].datte);
    if (result) {
      weekPlans.push(p);
    }
  });

  res.json({ success: weekPlans });
};

const MonthPlans = async (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT * FROM lessons WHERE user_id = $1 AND sign = '0' ORDER BY lesson_id DESC";
  const lessons = await pool.query(sql, [id]);
  const monthplans = [];
  lessons?.rows.map((p) => {
    const result = isCurrentMonth(p.table_two[p.table_two.length - 1].datte);
    if (result) {
      monthplans.push(p);
    }
  });

  res.json({ success: monthplans });
};

// Return true if the plan lays in the current month
function isCurrentMonth(datte) {
  const currentDate = new Date();
  const date = new Date(datte);
  return (
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
}

// Return true if the plan lays in the current week
const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const diff = today.getDate() - currentDay;
  const startDate = new Date(today.setDate(diff));
  const endDate = new Date(today.setDate(startDate.getDate() + 6));
  return {
    startDate,
    endDate,
  };
};

const isInCurrentWeek = (dateToCheck) => {
  const { startDate, endDate } = getCurrentWeekDates();
  const checkDate = new Date(dateToCheck);
  return checkDate >= startDate && checkDate <= endDate;
};

module.exports = {
  setLesson,
  getLesson,
  getUserLessons,
  updateLesson,
  createPDFLesson,
  signPlan,
  SignedPlans,
  WeekPlans,
  MonthPlans,
  deleteLesson,
};
