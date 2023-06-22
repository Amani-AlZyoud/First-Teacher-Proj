const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'Awbgce#1',
    host: 'localhost',
    port: 5432,
    database: 'firstTeacher',

})


module.exports = pool;