import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId:String,
    username:String,
    email:String,
    picture:String,
    dialog: String,
    about: String,
    gitLink: String,
    instaLink: String,
    linkedinLink: String,
    portfolioLink: String,
    profession: String,
    Education: String,
    skills: [],
    projects: [],
    bookmarks:[{heading:String,url:String}],
})

const blogSchema= new Schema({
    userId:String,
    author:String,
    email:String,
    picture:String,
    image:String,
    heading:String,
    content:String,
    date:{type:Date,default:Date.now},
    likes:[{type:Schema.Types.ObjectId,ref:'User'}], 
    comments:[{comment:String,picture:String}],
})

const Blogmodel=mongoose.model("blogs",blogSchema);
blogSchema.index({heading:"text",author:'text'})
const User=mongoose.model("users",userSchema);
userSchema.index({username:'text'});
export {User , Blogmodel}