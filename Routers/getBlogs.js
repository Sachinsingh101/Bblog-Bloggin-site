import express from 'express'
const blogsRouter=express.Router();
import { Blogmodel, User } from '../Database/modules.js';

blogsRouter.get('/getblogs',async(req,res)=>{
    try{
        const blogs=await Blogmodel.find();
        res.send(blogs);
    }catch(err){
        console.log("error in fetching blogs");rs
    }
})
blogsRouter.get('/getsingleblog/:id',async(req,res)=>{
    try{
        var blog=await Blogmodel.findById(req.params.id);
        res.send(blog);
    }catch(err){
        console.log("error while fetching single Blog",err);
    }
})

blogsRouter.post('/search',async(req,res)=>{
    console.log(req.body);
    try{
        const BlogsSearched=await Blogmodel.find({$text:{$search:req.body.value}});
        const UserSearched=await User.find({$text:{$search:req.body.value}});
        res.send({Blogs:BlogsSearched,Users:UserSearched});
    }catch(err){
        console.log("error while searching in databse");
    }
})

blogsRouter.get('/user-profile/:userid',async(req,res)=>{
    const Params=req.params;
    try{
      const user=await User.findById(Params.userid);
      res.send(user);
    }catch(err){
        console.log("Error while fetching user");
    }
})
export default blogsRouter;