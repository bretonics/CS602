// Weather API Router
const router = require('express').Router();
const axios = require('axios');
const Weather = require('../../models/Weather');

// AccuWeather API Routes

// API Route '/api/weather'
router.get('/', (req, res) => {
    const apiKey = process.env.ACWEATHER_API_KEY;
    var instance = axios.create({
        baseURL: 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/348735',
        timeout: 1000,
        params: {
            apikey: apiKey,
        },
    });

    instance.get('',)
        .then( (response) => {
            console.log("Fetched AccuWeather data.");
            let data = response.data;

            // Save to DB
            let entry = { 'dateObtained': new Date(), 'response': data }
            const entryDB = new Weather(entry);
            entryDB.save();

            return res.json(entryDB);
        })
        .catch( (error) => {
            console.log("ERROR:", error);
        });

});


// Export Routes
module.exports = router;