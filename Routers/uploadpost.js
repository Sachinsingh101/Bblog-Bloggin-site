import express from "express";
import dotenv from 'dotenv';
import cloudinary from "cloudinary";
const postrouter = express.Router();
import { Blogmodel,User } from "../Database/modules.js";
import multer from "multer";
dotenv.config();
const storage=multer.diskStorage({});
let upload=multer({
    storage,
});

cloudinary.config({
     cloud_name:process.env.cloud_name,
     api_key:process.env.api_key,
     api_secret:process.env.api_secret,
});

postrouter.post("/publish-blog",upload.single('image'), async (req, res) => {
  try {
     const file = req.file;
     console.log(req.body.author);
     await cloudinary.v2.uploader.upload(file.path).then((result) => {
      const url = result.url;
      const content = {
        userId:req.body.userId,
        author:req.body.author,
        email:req.body.email,
        picture:req.body.picture,
        image: url,
        heading: req.body.heading,
        content: req.body.content,
      };
      const blogmodel = new Blogmodel(content);
      blogmodel.save();
      console.log("Blog published successfully");
    });
    
  } catch (err) {
    console.log("error while publishing a blog", err);
  }
});

postrouter.post('/post-comment',async(req,res)=>{
  const{ id ,comment,picture}=req.body
   try{
     picture ? 
     await Blogmodel.findByIdAndUpdate(id,{$push:{comments:{"comment":comment,"picture":picture}}},
     {
       new: true
     }) : null
   }catch(err){
    console.log("error while commenting",err);
   }
})

postrouter.post('/cutomize-profile',async(req,res)=>{
  const customize=req.body.custoMize;
  try{
      await User.findByIdAndUpdate(req.body.userid,{
      dialog:customize.dialog,
      about:customize.about,
      gitLink:customize.gitLink,
      instaLink:customize.instaLink,
      linkedinLink:customize.linkedinLink,
      portfolioLink:customize.portfolioLink,
      skills:customize.skills,
      projects:customize.projects,
      profession:customize.profession,
      Education:customize.Education
    },
    {
      new : true
    }
    )
    console.log(req.body,"done");
  }catch(err){
    console.log("error while cutomizing user ",err)
  }
})

export default postrouter;
