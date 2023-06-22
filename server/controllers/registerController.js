const pool = require("../config/dbConn");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleNewUser = async (req, res) => {

    const { username, email, password, school_name, gender, user_img, role_id  } = req.body;

    // check for duplicate emails in the db
    const sql = "SELECT email FROM users where email = $1 AND active = '1'";
    const duplicate = await pool.query(sql, [email]);

    if (duplicate.rows.length !== 0) {
       return  res.status(201).json({ 'conflict': `email is already used` });
    }
    try {

            // create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "user": { username, email, password },
                        "role": role_id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET
            );


        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //create and store the new user
        const sql2 = "INSERT INTO users (username, email, password, school_name, gender, user_img, role_id, active) VALUES($1, $2, $3 , $4 , $5, $6, $7, $8) RETURNING *";
        const result = await pool.query(sql2, [username, email, hashedPwd, school_name, gender, user_img, role_id, 1]);

        res.status(201).json({ 'success': { 'user': result.rows[0], 'token': accessToken} });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };