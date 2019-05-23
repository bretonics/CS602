// API Routes
const router = require('express').Router();

// Require Routes
const userRoute = require('./user');
const newsRoute = require('./news');
const githubRoute = require('./github');
const weatherRoute = require('./weather');
const mapquestRoute = require('./mapquest');

// Root API Route
router.get('/', (req, res) => { res.status(401).send("Not allowed"); });

// Use Specified Routes
router.use('/user', userRoute);
router.use('/news', newsRoute);
router.use('/github', githubRoute);
router.use('/weather', weatherRoute);
router.use('/mapquest', mapquestRoute);

// Export Routes
module.exports = router;