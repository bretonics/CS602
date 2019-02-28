const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

// Initialize app and use attributes
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));   // parse request body content
app.use(express.json());

// Data
app.post('/data', (req, res) => {
    // SQL keywords
    const keywords = ["ADD", "ADD CONSTRAINT", "ALTER", "ALTER COLUMN", "ALTER TABLE", "ALL", "AND", "ANY", "AS", "ASC", "BACKUP DATABASE", 
                      "BETWEEN", "CASE", "CHECK", "COLUMN", "CONSTRAINT", "CREATE", "CREATE DATABASE", "CREATE INDEX", "CREATE OR REPLACE VIEW", 
                      "CREATE TABLE", "CREATE PROCEDURE", "CREATE UNIQUE INDEX", "CREATE VIEW", "DATABASE", "DEFAULT", "DELETE", "DESC", "DISTINCT", 
                      "DROP", "DROP COLUMN", "DROP CONSTRAINT", "DROP DATABASE", "DROP DEFAULT", "DROP INDEX", "DROP TABLE", "DROP VIEW", "EXEC", 
                      "EXISTS", "FOREIGN KEY", "FROM", "FULL OUTER JOIN", "GROUP BY", "HAVING", "IN", "INDEX", "INNER JOIN", "INSERT INTO", 
                      "INSERT INTO SELECT", "IS NULL", "IS NOT NULL", "JOIN", "LEFT JOIN", "LIKE", "LIMIT", "NOT", "NOT NULL", "OR", "ORDER BY", 
                      "OUTER JOIN", "PRIMARY KEY", "PROCEDURE", "RIGHT JOIN", "ROWNUM", "SELECT", "SELECT DISTINCT", "SELECT INTO", "SELECT TOP", 
                      "SET", "TABLE", "TOP", "TRUNCATE TABLE", "UNION", "UNION ALL", "UNIQUE", "UPDATE", "VALUES", "VIEW", "WHERE"];

    // Get textarea input and split words by space
    let paragraph = req.body.paragraph.split(" ");

    // Loop every word of paragraph and check if its a keyword
    // Keep track of index to replace reversed word in paragraph
    let i = 0;
    paragraph.forEach( word => {
        if (keywords.includes( word.toUpperCase() )) {
            // Reverse word and replace in paragraph
            let tmp = word.split("").reverse().join("");
            paragraph[i] = tmp;
        }
        i++;
    })

    // Reconstruct paragraph
    paragraph = paragraph.join(" ");
    // Respond with modified paragraph
    res.send(paragraph)

});


// Start Express server
app.listen(port, () => {
    console.log(`Book Services listening on port ${port}!`)
    }
);
