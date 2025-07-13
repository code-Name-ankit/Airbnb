const Listing = require("../models/listing.js");
const Fuse = require("fuse.js");
//Search Route
module.exports.searchListings = async (req, res) => {
  const query = req.query.q || "";
  const alllistings = await Listing.find({});

  const fuse = new Fuse(alllistings, {
    keys: ["title", "description", "location", "country"],
    threshold: 0.3, // smaller = stricter match
  });

  const result = fuse.search(query);
  let allListings = result.map((r) => r.item);

  if (!allListings || allListings.length === 0) {
    req.flash("error", " This Listing is not found");
    res.redirect("/listings");
  } else {
        res.render("listings/index", {  allListings });
  }
};
