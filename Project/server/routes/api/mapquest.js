// MapQuest API Router
const router = require('express').Router();
const axios = require('axios');
const MapQuest = require('../../models/MapQuest');

// AccuMapQuest API Routes '/api/mapquest'

// API Directions Route
router.get('/:from-:to', (req, res) => {
    const { from, to } = req.params;

    const apiKey = process.env.MAPQUEST_API_KEY;
    var instance = axios.create({
        baseURL: 'http://open.mapquestapi.com/directions/v2/route',
        timeout: 1000,
        params: { 
            'key': apiKey,
            'from': from,
            'to': to,
         }
    });

    instance.get('')
        .then((response) => {
            console.log("Fetched MapQuest API.");
            let data = response.data;
            let route = data.route;

            // Save to DB
            let entry = { 'route': route, 'from': from, 'to': to, }
            const entryDB = new MapQuest(entry);
            entryDB.save();

            return res.json(data);
        })
        .catch((error) => {
            console.log("ERROR:", error);
        });
});


// Export Routes
module.exports = router;