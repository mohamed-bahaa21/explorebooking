// File name: index.js
// Author's name: Chung Yin Tsang
// StudentID: 301216704
// Web App name: explorebooking

var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');


//route for deleting post






/* GET home page. */
router.get('/', controlerIndex.home);

// Route for filter by region
router.get('/filterByRegion/:region', controlerIndex.filterByRegion);

module.exports = router;
