const isDevMode = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3002;

const app = require("express")();
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionConfig = {
    secret: 'asfhaosdhfoqewhfeorhwer',
    cookie: {maaxAge: 60000},
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('morgan')('dev'));
app.use(require('cookie-parser')());
app.use(require('cors')());
app.use(require("./routes"));

app.listen(port, () => {
    const startup = `${new Date().toUTCString()} - Vacation getaway services API is up and running and listening on ${port}`;
    console.log(startup);
});
