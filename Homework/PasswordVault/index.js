const express = require('express');
const cors = require('cors');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const port = 3002;
const session = {
    // This is the secret used to sign the session ID cookie
    secret: "manthiscookieisdelishhMONSTAAAH",
    // Forces the session to be saved back to the session store, even if the session was never modified during the request
    resave: false,
    // Forces a session that is “uninitialized” to be saved to the store
    saveUninitialized: true,
    // would require https:// on localhost
    cookie: { secure: false },
}

var corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'PUT', 'POST'],
}

// Initialize app and use attributes
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));   // parse request body content
app.use(expressSession(session));
app.use(express.json());
app.use(cors(corsOptions));

// Setup session to hold passwords
app.all('*', (req, res, next) => {
    let passwords = req.session.passwords || [];
    req.session.passwords = passwords;
    next();
});

// Get all passwords
app.get('/passwords', (req, res) => {
    // return all passwords in vault
    console.log("Retriving all passwords...");
    res.json(req.session.passwords);
});

// Add new password to vault
app.post('/passwords/add', (req, res) => {
    let id = generateID(req);
    const { source, password, name } = req.body;
    // console.log(source, name, password);

    // create login object from password information entered
    const login = { 'source': source,
                    'name': name,
                    'password': password,
                    'id': id,
                    }

    // add password entered to vault
    console.log("Saving: ", login);
    req.session.passwords.push(login);

    // return login entered
    res.json(login);

});

// Change password
app.post('/passwords/change', (req, res) => {
    const { id, newpassword } = req.body;
});


app.listen(port, () => {
    console.log(`Passwords Vault Services listening on port ${port}!`)
    console.log("Session:", JSON.stringify(session))
    }
);


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