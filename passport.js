

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2'
import {User} from './Database/modules.js';
import dotenv from 'dotenv';

dotenv.config();
passport.serializeUser((user,done)=>{
    done(null, user);
    console.log(user)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
        console.log(user)
    })
})

//Google Strategy

const googleClientID=process.env.googleClientID;
const googleClientSecret=process.env.googleClientSecret;
const GITHUB_CLIENT_ID=process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET=process.env.GITHUB_CLIENT_SECRET;


passport.use(
    new GoogleStrategy({
        clientID:googleClientID,
        clientSecret:googleClientSecret,
        callbackURL:"/auth/callback",
        proxy:true,
    },
    (accessToken, refreshToken, profile,done)=>{
       try{
         User.findOne({userId:profile.id})
        .then((existingUser)=>{
             if(existingUser){
                 done(null,existingUser)
             }else{
                   new User({
                      userId:profile.id,
                      username:profile.displayName,
                      email:profile._json.email,
                      picture:profile._json.picture
                   }).save()
                  .then((user)=>{
                      done(null,user)
                  })
               }
        })
       }catch(err){
        console.log("Error while handling Signup Signin Requst callback passpoprt");
       }
    }
    )
    
);

//Github Strategy

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "https://bblog-blogging-site.onrender.com/auth/github/callback",
  },
   (accessToken, refreshToken, profile, done)=>{
    try{
        User.findOne({userId:profile.id})
        .then((existingUser)=>{
           if(existingUser){
               done(null,existingUser);
           }else{
                new User({
                   userId:profile.id,
                   username:profile.displayName,
                   email:profile._json.blog,
                   picture:profile.photos[0].value,
               }).save()
               .then((user)=>{
                   done(null,user);
                   // console.log(user);
               })
           }
        })
    }catch(err){
        console.log("Error while handlign Signup Signin callback passport !!")
    }
  }

  
));


