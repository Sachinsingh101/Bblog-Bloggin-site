import express from "express";
const likesRouter = express.Router();
import { Blogmodel, User } from "../Database/modules.js";

likesRouter.post("/likesRoute", async (req, res) => {
  try {
    const { blogId, userid} = req.body;
    const blog= await Blogmodel.find({_id:blogId,likes:userid});
    if(blog.length==0){
      await Blogmodel.findByIdAndUpdate(blogId,{$push:{likes:userid}},
        {
          new: true
        })
    }else{
      await Blogmodel.findByIdAndUpdate(blogId,{$pull:{likes:userid}},
        {
          new: true
        })
    }
  } catch (err) {
    console.log("error in likesRoute", err);
  }
});

likesRouter.post('/add-to-bookmarks',async(req,res)=>{
  try{
     const user=await User.findById(req.body.user);
     const url=user.bookmarks.filter(url=>url.url===req.body.url);
     if(url.length==0){
      await User.findByIdAndUpdate(req.body.user,{$push:{bookmarks:{heading:req.body.heading,url:req.body.url}}},
        {
          new : true
        })
     }else{
      await User.findByIdAndUpdate(req.body.user,{$pull:{bookmarks:{heading:req.body.heading,url:req.body.url}}},
        {
          new : true
        })
     }
  }catch(err){
    console.log("error while adding to bookmarks");
  }
})

export default likesRouter;
