require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config.js');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());
// ROUTES IMPORT

const userRoutes = require('./routes/userRoutes');

// ROUTES

app.use(userRoutes);



app.listen(port, () => console.log('Serveur ouvert sur le port : ' + port))