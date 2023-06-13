import express from 'express'
const router=express.Router();
import passport from "passport";

//Google Routes

router.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email'],
    session:true
  }
));

router.get("/auth/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("https://bblog-blogging.onrender.com");
});

//Github Routes

router.get("/auth/github", passport.authenticate("github",{
  session:true
}));

router.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("https://bblog-blogging.onrender.com");
  }
);


router.get('/api/current_user',(req,res)=>{
    res.send(req.user);
    console.log(req.passport.session.user);
})

router.get('/api/logout',(req,res)=>{
    req.logout();
    res.status(200).json({logout:'success'});
})

export default router;
