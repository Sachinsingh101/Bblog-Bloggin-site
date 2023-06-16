import express from 'express'
const router=express.Router();
import passport from "passport";

//Google Routes

router.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email'],
  }
));

router.get("/auth/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

//Github Routes

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("/");
  }
);


router.get('/api/current_user',(req,res)=>{
    res.send(req.user);
    console.log(req.user);
    console.log(req.session);
})

router.get('/api/logout',(req,res)=>{
    req.logout();
    res.redirect("/#/Signup");
})

export default router;
