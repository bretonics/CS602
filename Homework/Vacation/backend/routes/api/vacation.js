const router = require('express').Router();
const fs = require('fs');
const file = './vacations.data';

// Save to file
router.post('/destination', (req, res) => {
    const {destination} = req.body;

    if(destination === null || destination == undefined) {
        // Bad request
        return res.status(400).json( {result: "No data"} );
    }

    // Check entry
    var safe = checks(destination);
    console.log(safe);
    
    // Open file for reading and writting
    if (safe) {
        fs.readFile(file, { flag: 'a+' }, (err, contents) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({ result: `error: ${err.message}` });
            }

            let data = [];
            if (contents.length > "[]".length) {
                data = JSON.parse(contents);
            }
            data.push({ location: destination });

            // Write all data back to file, including new destination
            fs.writeFile(file, JSON.stringify(data), { flag: 'w' }, (err) => {
                if (err) {
                    return res.status(500).json({ result: `error: ${err.message}` });
                }
                res.status(200).json({ result: "Sucess" });
            });
        });
    } else {
        // Checks not passed
        return res.json( {result: "Entry did not pass checks."});
    }
});


// Get file and read
router.get('/destination', (req, res) => {
    fs.readFile(file, (err, contents) => {
        if (err) {
            return res.status(500).json( { result: `error: ${err.message}` } );
        }
        // Return JSON file contents
        res.status(200).json(JSON.parse(contents));
    });
});


// Reset file - remove all contents
router.get('/reset', (req, res) => {
    fs.writeFile(file, '', (err) => {
        if(err) throw err;
        console.log('File has been emptied!');
    });
});




//--------------------------------------------------------------------------------
// HELPER FUNCTIONS

// All checks
function checks(destination) {
    return( noDuplicates(destination) && noSQL(destination) );
}


// Check duplicates in file
function noDuplicates(destination) {
    var contents = fs.readFileSync(file);
    // Get all saved locations and compare to entered destination
    if (contents.length > 0) {
        data = JSON.parse(contents);
        for (entry of data) {
            let location = entry.location;
            if (location === destination) {
                console.log(`'${destination}' is already an entry in ${file}`);
                return false;
            }
        }
    }
    return true;
}



// Check SQL injection
function noSQL(destination) {
    var alert = true;
    // SQL keywords
    const keywords = ["ADD", "ADD CONSTRAINT", "ALTER", "ALTER COLUMN", "ALTER TABLE", "ALL", "AND", "ANY", "AS", "ASC", "BACKUP DATABASE",
        "BETWEEN", "CASE", "CHECK", "COLUMN", "CONSTRAINT", "CREATE", "CREATE DATABASE", "CREATE INDEX", "CREATE OR REPLACE VIEW",
        "CREATE TABLE", "CREATE PROCEDURE", "CREATE UNIQUE INDEX", "CREATE VIEW", "DATABASE", "DEFAULT", "DELETE", "DESC", "DISTINCT",
        "DROP", "DROP COLUMN", "DROP CONSTRAINT", "DROP DATABASE", "DROP DEFAULT", "DROP INDEX", "DROP TABLE", "DROP VIEW", "EXEC",
        "EXISTS", "FOREIGN KEY", "FROM", "FULL OUTER JOIN", "GROUP BY", "HAVING", "IN", "INDEX", "INNER JOIN", "INSERT INTO",
        "INSERT INTO SELECT", "IS NULL", "IS NOT NULL", "JOIN", "LEFT JOIN", "LIKE", "LIMIT", "NOT", "NOT NULL", "OR", "ORDER BY",
        "OUTER JOIN", "PRIMARY KEY", "PROCEDURE", "RIGHT JOIN", "ROWNUM", "SELECT", "SELECT DISTINCT", "SELECT INTO", "SELECT TOP",
        "SET", "TABLE", "TOP", "TRUNCATE TABLE", "UNION", "UNION ALL", "UNIQUE", "UPDATE", "VALUES", "VIEW", "WHERE"];

    // Loop every SQL keyword and check if matches passed destination value
    keywords.forEach( word => {
        if (destination.toUpperCase() == word) {
            console.log(`'${destination}' matches an SQL keyword.`);
            alert = false;
        }
    });

    // No SQL keywords found
    return alert;
}

module.exports = router;