const express = require("express");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const router = express.Router({ mergeParams: true });
const { saveRedirectUrl } = require("../middleware.js");

const userControllers = require("../controllers/users.js");

router
  .route("/signup")
  .get(userControllers.signupForm)
  .post(wrapAsync(userControllers.signup));

router
  .route("/login")
  .get(userControllers.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControllers.login
  );


router.get("/logout", userControllers.looaut);

module.exports = router;
