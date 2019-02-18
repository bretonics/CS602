const express = require('express');
const cors = require('cors');
const expressSession = require('express-session');

const port = 3001;
const session = {

}
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST'],
}
// Initialize app and use attributes
var app = express();
app.use(expressSession(session));
app.use(express.json());
app.use(cors());

