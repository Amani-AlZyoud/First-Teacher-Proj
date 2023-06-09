const pool = require("../config/dbConn");
const bcrypt = require('bcrypt');

const getAllTeachers = async (req, res) => {
    const Teachers = await pool.query(
        "SELECT * FROM users WHERE active = '1' AND role_id = '2' ORDER BY user_id DESC"
      );
    if (Teachers.rows.length === 0) return res.json({ 'message': 'No Teachers found.' });
    res.json({ "success": Teachers.rows});
}

const createNewTeacher = async (req, res) => {
    const { username, email, password, school_name, gender, user_img } = req.body;

    // check for duplicate emails in the db
    const sql = "SELECT email FROM users where email = $1 AND active = '1'";
    const duplicate = await pool.query(sql, [email]);
    if (duplicate.rows.length !== 0) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const sql2 = "INSERT INTO users (username, email, password, school_name, gender, user_img, role_id, active) VALUES($1, $2, $3 , $4 , $5, $6, $7, $8) RETURNING *";
        const result = await pool.query(sql2, [username, email, hashedPwd, school_name, gender, user_img, '2', '1']);

        console.log(result);

        res.status(201).json({ 'success': `New user (${result.rows[0].username}) created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.json({ 'message': 'Teacher ID required.' });
    const sql = "UPDATE users SET active = '0' WHERE user_id = $1";
    const deletedTeacher = await pool.query(sql, [id]);
    res.json({ "success": `Teacher ID ${id} Deleted.`});
}

const getTeacher = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.json({ 'message': 'Teacher ID required.' });

    const teacher = await pool.query("SELECT * FROM users WHERE user_id = $1 AND role_id = '2' AND active = '1'", [id]);
    if (teacher.rows.length === 0) {
        return res.json({ "message": `No teacher matches ID ${id}.` });
    }
    res.json(teacher.rows[0]);
}

const getGroup = async (req, res) => {

    const { school_name } = req.body;
    if (!school_name) return res.json({ 'message': 'School name is required.' });

    const teachers = await pool.query("SELECT * FROM users WHERE school_name = $1 AND role_id = '2' AND active = '1' GROUP BY user_id, gender ORDER BY user_id DESC", [school_name]);
    if (teachers.rows.length === 0) {
        return res.json({ "message": `No teachers.` });
    }
    res.json({'success': teachers.rows});
}

   
const deletedTeachers = async (req, res) => {
    const Teachers = await pool.query(
        "SELECT * FROM users WHERE active = '0' AND role_id = '2' ORDER BY user_id DESC"
      );
    if (Teachers.rows.length === 0) return res.json({ 'message': 'No Teachers found.' });
    res.json({ "success": Teachers.rows});
}

const activeTeacher = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.json({ 'message': 'Teacher ID required.' });
    const sql = "UPDATE users SET active = '1' WHERE user_id = $1";
    const deletedTeacher = await pool.query(sql, [id]);
    res.json({ "success": `Teacher ID ${id} Activited.`});
}


module.exports = {
    getAllTeachers,
    createNewTeacher,
    deleteTeacher,
    getTeacher,
    getGroup,
    deletedTeachers,
    activeTeacher
}