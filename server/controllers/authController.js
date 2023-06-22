const pool = require("../config/dbConn");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const sql = "SELECT * FROM users WHERE email = $1 AND active = '1'";
    const foundUser = await pool.query(sql, [email]);

    if (foundUser.rows.length === 0) {
        return res.status(201).json({ 'Invalid': 'Email is Invalid' });} //Unauthorized 
        
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.rows[0].password);
    if (match) {
        const role_id = foundUser.rows[0].role_id;

         // create JWTs
         const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "user": { username: foundUser.rows[0].username, email, password },
                    "role": role_id
                }
            },
            process.env.ACCESS_TOKEN_SECRET
        );


        // Send authorization roles and access token to user
        res.status(201).json({ 'success': { 'user': foundUser.rows[0], 'token': accessToken} });

    } 
    
    else {
        res.status(201).json({ 'Invalid': 'Password is Invalid' });
    }
}

module.exports = { handleLogin };