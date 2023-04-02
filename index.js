const express = require('express');
const connectDB = require('./server/database/db');
const app = express();
const path = require('path');
const PORT = process.env.PORT ||3000;
require('dotenv').config();

connectDB();

//Template engine
app.set('views', path.join(__dirname, "/views"));
app.set('view engine',"ejs")

// static files
app.use(express.static('public'))

//rendering time ma json form ma hunxa and json form has to allow
app.use(express.json());

//Routes 
app.use('/api/files',require('./server/router/router'))
app.use('/files', require('./server/router/show'))
app.use('/files/download',require('./server/router/download'))

app.listen(PORT, ()=>{
        console.log(`Server is running in ${PORT}`);
    })


