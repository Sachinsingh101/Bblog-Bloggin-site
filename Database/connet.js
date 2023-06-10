import mongoose from 'mongoose';

export const ConnectoDb=async(DATABASE_URL)=>{
   try{
     await mongoose.connect(DATABASE_URL);
     console.log("connected to db successfully");
   }catch(err){
    console.log("error while connecting to database",err);
   }
}