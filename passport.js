

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2'
import {User} from './Database/modules.js';
import dotenv from 'dotenv';

dotenv.config();
passport.serializeUser((user,done)=>{
    done(null, user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

//Google Strategy

const googleClientID="692897615557-f14d8ekeg070pj1gvrsn34883gqh3p3o.apps.googleusercontent.com";
const googleClientSecret="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";
const GITHUB_CLIENT_ID="53de6f9a221e5269f363";
const GITHUB_CLIENT_SECRET="d66ade60b3e6f2c25cbd7b0e8cf230d750fa0a0c";


passport.use(
    new GoogleStrategy({
        clientID:googleClientID,
        clientSecret:googleClientSecret,
        callbackURL:"https://revcode-service.onrender.com/auth/callback",
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

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://revcode-service.onrender.com/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        User.findOne({ userId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              userId: profile.id,
              username: profile.displayName,
              email: profile._json.blog,
              picture: profile.photos[0].value,
            })
              .save()
              .then((user) => {
                done(null, user);
                // console.log(user);
              });
          }
        });
      } catch (err) {
        console.log("Error while handlign Signup Signin callback passport !!");
      }
    }
  )
);


