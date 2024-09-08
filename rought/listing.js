const express=require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}= require("../middlewere.js")
const listingController= require("../controller/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage})

// Index Route - Show all listings
router.route("/")
.get(wrapAsync(listingController.index))
.post(        
        isLoggedIn,
        upload.single('Listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing));
// .post(upload.single('Listing[image]'),(req,res)=>{
//     res.send(req.file);
// });

// New Listing Form Route
router.get("/new",isLoggedIn,listingController.renderNewform);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('Listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

// Edit Form Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports=router;