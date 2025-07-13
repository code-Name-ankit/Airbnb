const Listing = require("../models/listing.js");

//Search Route
module.exports.searchListings = async (req, res) => {
  const query = req.query.q || "";
  const allListings = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      {country: { $regex: query, $options: "i" }}
    ],
  });

  res.render("listings/results", { allListings });
};