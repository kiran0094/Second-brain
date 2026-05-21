import { Schema,Types,model } from "mongoose";
import { link } from "node:fs";
import { ref } from "node:process";

const linkSchema=new Schema({
    link:{type:String,required:true},
    useref:{type:Types.ObjectId,required:true,ref:"User"}
});

export const Link=model("Link",linkSchema);