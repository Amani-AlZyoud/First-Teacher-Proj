require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');

const PORT = process.env.PORT || 3500;


// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json({ limit: "50mb" }));

app.maxHttpHeaderSize = 16 * 1024; // Set the desired size

// middleware to handle errors
app.use(errorHandler);

// routes
// Sign Up (register) for new user
app.use('/register', require('./routes/register'));

// Login 
app.use('/auth', require('./routes/auth'));

// middleware to verify the JWT TOKEN
app.use(verifyJWT);

// Teacher routes
app.use('/teachers', require('./routes/api/teachers'));

// users
app.use('/users', require('./routes/api/users'));

// Headmaster routes
app.use('/headmasters', require('./routes/api/headmasters'));

app.use('/lessons', require('./routes/api/lessonsPlan'));


// start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
