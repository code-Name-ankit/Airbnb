const Listing = require("../models/listing.js");
const Fuse = require("fuse.js");
//Search Route
module.exports.searchListings = async (req, res) => {
  const query = req.query.q || "";
  const allListings = await Listing.find({});

  
    const fuse = new Fuse(allListings, {
      keys: ["title", "description", "location","country"],
      threshold: 0.3,  // smaller = stricter match
    });

    const result = fuse.search(query);
   let  listings = result.map(r => r.item);
  


if (!listings || listings.length === 0 ) {
    req.flash("error", " This Listing is not found");
    res.redirect("/listings");
  } else {
    res.render("listings/results", { listings });
  }

  
};