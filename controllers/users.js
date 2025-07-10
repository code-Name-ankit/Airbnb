const User = require("../models/user.js");
const Listing = require("../models/listing.js");
module.exports.signupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust!");

  let redirectUrl = res.locals.redirectUrl || "/listings";

  const idMatch = redirectUrl.match(/\/listings\/([a-f0-9]{24})/);
  if (idMatch) {
    const id = idMatch[1];
    const listing = await Listing.findById(id);
    if (listing) {
      return res.redirect(`/listings/${id}`);
    }
  }
  // console.log(res.locals.redirectUrl);
  res.redirect(redirectUrl);
};

module.exports.looaut = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
