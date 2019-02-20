const express = require('express');
const cors = require('cors');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const port = 3002;
const session = {
    secret: "hellowwww",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}
var corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'PUT', 'POST'],
}
// Initialize app and use attributes
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(expressSession(session));
app.use(express.json());
app.use(cors());

// Setup session to hold passwords
app.all('*', (req, res, next) => {
    let passwords = req.session.passwords || [];
    req.session.passwords = passwords;
    next();
});

// Get all passwords
app.get('/passwords', (req, res) => {
    // return all passwords in vault
    res.json(req.session.passwords);
});

// Add new password to vault
app.post('/passwords/add', (req, res) => {
    let id = generateID(req);
    const { source, password } = req.body;
    console.log(source, password);

    // create login object from password information entered
    const login = { 'source': source,
                    'password': password,
                    'id': id,
                    }

    // add password entered to vault
    req.session.passwords.push(login);

    // return login entered
    res.json(login);

});

// Change password
app.post('/passwords/change', (req, res) => {

});


app.listen(port, () => console.log(`Passwords Vault Services listening on port ${port}!`));


//--------------------------------------------------------------------------------
// HELPER FUNCTIONS

// Generates new id for entries, preventing duplicates
function generateID(req) {
    // Get all current ids
    let ids = getIDs(req);
    
    // Check if id already present, generate until not duplicate
    let id = Math.floor((Math.random() * 1000000) + 1);
    while(ids.includes(id)) {
        id = Math.floor((Math.random() * 1000000) + 1);
    }
    return id;
}

// Gets all current ids for passwords in vault
function getIDs(req) {
    let ids = [];
    req.session.passwords.forEach(login => {
        ids.push(login.id);
    });
    return ids;
}