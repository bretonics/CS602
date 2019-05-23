// News API Router
const router = require('express').Router();
const axios = require('axios');
const News = require('../../models/News');

// News API Routes

// API Route '/api/news' for headline news
router.get('/', (req, res) => {
    const apiKey = process.env.NEWS_API_KEY;
    var instance = axios.create({
        baseURL: 'https://newsapi.org/v2/top-headlines?country=us',
        timeout: 1000,
        params: {
            apikey: apiKey,
        }
    });

    instance.get('')
        .then((response) => {
            console.log("Fetched News API.");
            let data = response.data;
            let articles = data.articles;

            // Save to DB
            let entry = { 'dateObtained': new Date(), 'articles': articles }
            const entryDB = new News(entry);
            entryDB.save();

            // Return Articles JSON Object
            return res.json(articles);
        })
        .catch((error) => {
            console.log("ERROR:", error);
        });
});


// Export Routes
module.exports = router;