const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors  = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const port = process.env.PORT || 3000;


// Global Configurations
mongoose.promise = global.Promise;  // mongoose's promise to global promise
const isProduction = process.env.NODE_ENV === 'production';
const sessionConfig = {
    secret: 'passport-local-mcc',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
};
const corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:8888'],
    methods: ['GET', 'POST'],
    credentials: true,  // !important for Angular cookie sending
}

// Initiate application
const app = express();


// Configure application
app.use(cors(corsOptions));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));

if (!isProduction) { app.use(errorHandler()); }


// Models & Routes
require('./models/Users');
require('./config/passport');
app.use(require('./routes'));


// Configure Mongoose
const dbConfig = require("./config/database");
mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then( () => { 
        console.log(`${new Date().toUTCString()} - Successfully connected to MongoDB.`);
    }, err => { 
        console.log(`${new Date().toUTCString()} - Failed to connect to MongoDB. ${err.stack}`);
    }
);
mongoose.set('debug', isProduction);


// Error Handlers & Middlewares
if (!isProduction) {
    app.use( (err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

// Start server
app.listen(port, () => {
    const startupMessage = `${new Date().toUTCString()} - MCC server-side app listening on port ${port}`;
    console.log(startupMessage);
});

