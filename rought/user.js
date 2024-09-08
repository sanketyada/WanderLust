const express=require("express");
const router= express.Router({});
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middlewere.js");
const reviewController= require("../controller/users.js");

router.route("/signup")
.get(reviewController.signupForm)
.post(wrapAsync(reviewController.signup));

router.route("/login")
.get(reviewController.loginForm)
.post(
    saveRedirectUrl,
    passport.authenticate('local', {
        failureRedirect: '/login', 
        failureFlash: true
    }),
    reviewController.login
);    

router.get("/logout",reviewController.logout);

module.exports=router;

