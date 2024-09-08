
const User=require("../models/user")

//Signupform
module.exports.signupForm=(req,res)=>{
    res.render("./users/signup.ejs")
}
//Signup
module.exports.signup=async(req,res,next)=>{
    try{
        let{email,username,Password}=req.body;
        //console.log(username,email,Password);
        // let newUser=new User({
        //     email:email,
        //     username:username,
        // });
        let newUser=new User({email,username});
        let newRagister=await User.register(newUser,Password);
        req.login(newRagister,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome")
            res.redirect("/listings")
        })

    }catch(err){
        req.flash("error",err.message)
        res.redirect("/signup");
    }

}

//loginForm
module.exports.loginForm=(req,res)=>{
    res.render("./users/login.ejs")
}

//Login
module.exports.login=async (req, res) => {
    req.flash("success", "You are Welcome!");
    // if(res.locals.redirectUrl){
    //     res.redirect(res.locals.redirectUrl);/////////
    // }else{
    //     res.redirect("/listings");
    // }/
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

//logout

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You Successfully Logout");
        res.redirect("listings");
    })
}