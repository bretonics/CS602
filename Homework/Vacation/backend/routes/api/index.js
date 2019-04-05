const router = require('express').Router();
router.use('/vacation', require("./vacation"));
module.exports = router;