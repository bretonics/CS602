const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const port = 4200;
const session = {
    // This is the secret used to sign the session ID cookie
    secret: "fsdfgq03hfwr909j23asd;s,dav0fq4ghrjqh430f",
    // Forces the session to be saved back to the session store, even if the session was never modified during the request
    resave: false,
    // Forces a session that is “uninitialized” to be saved to the store
    saveUninitialized: true,
    // will not require https:// on localhost
    cookie: { secure: false },
}

// Initialize app and use attributes
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));   // parse request body content
app.use(expressSession(session));
app.use(express.json());

// Setup session to hold books
app.all('*', (req, res, next) => {
    // Books "database"
    req.session.books = [
        { name: 'Decoding the World', author: 'Andres Breton', isbn: '2346347'},
        { name: 'CodingIt', author: 'Andrew Shehan', isbn: '234761'},
        { name: 'Torture', author: 'Max Pain', isbn: '1230958'},
        { name: 'We Kickin', author: 'Sinatra Joshnosno', isbn: '470194000'},
    ];
    next();
});

// No root access
app.get( '/', (req, res) => res.send('You are not allowed at Books services.') );

// Books route
app.get('/books', (req, res) => {
    // Array to hold all book authors
    let names = [];
    // Go through entire book "databse" and psuh author to array being returned
    req.session.books.forEach(book => {
        names.push(book.name);
    });
    res.json(names);
});

// Author route
app.get('/books/isbn/:isbn/author', (req, res) => {
    // Get ISBN from route
    const isbn = req.params.isbn;
    // Search all books, find matching ISBN, return name of author corresponding to ISBN
    req.session.books.forEach(book => {
        if (book.isbn == isbn) {
            return res.send(book.author);
        }
    });
});


// Start Express server
app.listen(port, () => {
    console.log(`Book Services listening on port ${port}!`)
    console.log("Session:", JSON.stringify(session))
    }
);
