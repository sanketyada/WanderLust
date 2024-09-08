const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn=(req,res,next)=>{
    //console.log(req.baseUrl,req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login first");
        return res.redirect("/login");
     }
     next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if( req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner= async(req,res,next)=>{
    const { id } = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals( res.locals.CurrUser._id)){
        req.flash("error",`Only Owner Are Authorised for change`);
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// Validation listing Middleware
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(el => el.message).join(', '));
    } else {
        next();
    }
};

// Validation review Middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(el => el.message).join(', '));
    } else {
        next();
    }
};

module.exports.isAuthor= async(req,res,next)=>{
    const { id,reviewId } = req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals( res.locals.CurrUser._id)){
        req.flash("error",`Only Owner Are Authorised for change`);
        return res.redirect(`/listings/${id}`);
    }
    next();
}