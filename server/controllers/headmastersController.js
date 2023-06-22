const pool = require("../config/dbConn");
const bcrypt = require('bcrypt');

const getAllHeadmasters = async (req, res) => {
    const Headmasters = await pool.query(
        "SELECT * FROM users WHERE active = '1' AND role_id = '3'"
      );
    if (Headmasters.rows.length === 0) return res.status(204).json({ 'message': 'No Headmasters found.' });
    console.log("no Headmasters found")
    res.json(Headmasters.rows);
}

const createNewHeadmaster = async (req, res) => {
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
        const result = await pool.query(sql2, [username, email, hashedPwd, school_name, gender, user_img, '3', '1']);

        console.log(result);

        res.status(201).json({ 'success': `New user (${result.rows[0].username}) created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateHeadmaster = async (req, res) => {
    const { username, email, password, school_name, gender, user_img} = req.body;
    const { id } = req.params;

    if (!id) {
        return res.json({ 'message': 'ID parameter is required.' });
    }

    const headmaster = await pool.query("SELECT * FROM users WHERE user_id = $1 AND role_id = '3'", [id]);

    if (headmaster.rows.length === 0) {
        return res.json({ "message": `No headmaster matches ID ${id}.` });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const sql = "UPDATE users SET username = $1, email = $2, password = $3, school_name = $4, gender = $5, role_id = '3', user_img = $6 WHERE user_id = $7"
    const updatedHeadmaster = await pool.query(sql, [username, email, hashedPwd, school_name, gender, user_img, id])
    res.json({ "message": `Headmaster ID ${id} Updated.`});
}

const deleteHeadmaster = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.json({ 'message': 'Headmaster ID required.' });

    const headmaster = await pool.query("SELECT * FROM users WHERE user_id = $1 AND role_id = '3'", [id]);
    if (headmaster.rows.length === 0) {
        return res.json({ "message": `No headmaster matches ID ${id}.` });
    }
    const sql = "UPDATE users SET active = '0' WHERE user_id = $1";
    const deletedHeadmaster = await pool.query(sql, [id]);
    res.json({ "message": `Headmaster ID ${id} Deleted.`});
}

const getHeadmaster = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ 'message': 'Headmaster ID required.' });

    const headmaster = await pool.query("SELECT * FROM users WHERE user_id = $1 AND role_id = '3' AND active = '1'", [id]);

    if (headmaster.rows.length == 0) {
        return res.json({ "message": `No headmaster matches ID ${id}.` });
    }
    res.json(headmaster.rows[0]);
}

module.exports = {
    getAllHeadmasters,
    createNewHeadmaster,
    updateHeadmaster,
    deleteHeadmaster,
    getHeadmaster
}