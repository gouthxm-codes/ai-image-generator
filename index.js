const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const path = require('path')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))

app.use('/openai', require('./routes/aiRoutes'))
app.listen("8080", () => console.log('server started'))
