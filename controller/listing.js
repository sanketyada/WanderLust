const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:mapToken });

module.exports.index=async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index", { allListing });
}

module.exports.renderNewform=(req, res) => {
    res.render("listing/new");
}

module.exports.showListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
     //console.log(listing.owner);
    if (!listing) {
       req.flash("error","The Listing You Are requested for Delete does not exits!");
       res.redirect(`/listings`);
    }
    res.render("listing/show", { listing });
}

module.exports.createListing=async (req, res) => {

    let response= await geocodingClient
    .forwardGeocode({
        query: req.body.Listing.location,
        limit: 1,
      })
        .send()

    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting = new Listing(req.body.Listing);
    newlisting.owner = req.user._id;
    newlisting.image={url,filename};
    newlisting.geometry=response.body.features[0].geometry;
    let savedListing =await newlisting.save();
    //console.log(savedListing);
    req.flash("success","New Listing Added");
    res.redirect(`/listings`);
}

module.exports.renderEditForm=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error","The Listing You Are requested for Update does not exits!");
        res.redirect(`/listings`);
    }
    req.flash("success","Listing Edited");
    let originalImage=listing.image.url;
    originalImage=originalImage.replace("/upload","/upload/w_250");
    res.render("listing/edit", { listing,originalImage });
}
module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, req.body.Listing, { new: true });
   
    if(typeof req.file !=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
    
}

module.exports.destroyListing=async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}