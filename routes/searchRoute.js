const express = require("express");
const router = express.Router({ mergeParams: true });
// const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const searchControllers = require("../controllers/search.js");




// Search Route
router.get("/", wrapAsync(searchControllers.searchListings));


module.exports= router;