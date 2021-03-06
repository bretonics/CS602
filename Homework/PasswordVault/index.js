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
    // will not require https:// on localhost
    cookie: { secure: false },
}

var corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:8888'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,  // !important for Angular cookie sending
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

// No root access
app.get('/', (req, res) => res.send('You are not allowed.'));

// Express session endpoint
app.get('/session', function (req, res) {
    // console.log(`Session ID: ${req.session.id}`);
    // res.status(200).json({ sessionid: req.session.id });
});

// Get all passwords
app.get('/passwords', (req, res) => {
    // return all passwords in vault
    console.log("\nRetriving all passwords...\n\n", req.session.passwords);
    res.json(req.session.passwords);
});

// Add new password to vault
app.post('/passwords/add', (req, res) => {
    let id = generateID(req);
    const { source, password, name } = req.body;

    // Create login object from password information entered
    const login = { 'source': source,
                    'name': name,
                    'password': password,
                    'id': id,
                    'history': [],
                    }

    // Add password entered to vault
    console.log("Saving new entry to vault.\n");
    req.session.passwords.push(login);

    // return login entered
    res.json(login);

});

// Change password
app.post('/passwords/change', (req, res) => {
    const { id, newpassword } = req.body;
    let login = getLogin(req, id);

    // Replace login with new password
    if (login) {
        console.log(`Changing password for ${id}. Previous password stored.`);
        let index = req.session.passwords.indexOf(login);
        login.history.push(login.password);  // save previous password
        login.password = newpassword;  // change current password
        req.session.passwords[index] = login;  // replace new login in vault
    } else {
        console.log(`Sorry! No login found with id \`${id}\``);
    }

    // Return updated login
    console.log("UPDATED:\n", login);
    res.json(login);
});

// DELETE password
app.delete('/passwords/delete/:id', (req, res) => {
    // const { id } = req.body;
    const id = req.params.id;
    console.log("Deleting password: ", id);
    let login = getLogin(req, id);

    // Remove login entry from vault
    let index = req.session.passwords.indexOf(login);
    req.session.passwords.splice(index,1);
    res.json(req.session.passwords);

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

function getLogin(req, id) {
    let entry = null;
    req.session.passwords.forEach( (login) => {
        if (login.id == id) { entry = login; } 
    });
    return entry;
}