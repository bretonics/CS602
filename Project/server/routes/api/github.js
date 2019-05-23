// GitHub API Router
const router = require('express').Router();
const axios = require('axios');
const GitHub = require('../../models/GitHub');

// AccuGitHub API Routes

// API Route '/api/github'
router.get('/', (req, res) => {
    const apiKey = process.env.GITHUB_API_KEY;
    var instance = axios.create({
        baseURL: 'https://api.github.com',
        timeout: 1000,
        headers: { 'Authorization': `token ${apiKey}` }
    });

    instance.get('/users/bretonics')
        .then((response) => {
            console.log("Fetched GitHub API.");
            let profile = response.data;

            // Save to DB
            let entry = { 'user': 'bretonics', 'response': profile }
            const entryDB = new GitHub(entry);
            entryDB.save();

            // Return Profile JSON Object
            return res.json(profile);
        })
        .catch((error) => {
            console.log("ERROR:", error);
        });
});


// Export Routes
module.exports = router;