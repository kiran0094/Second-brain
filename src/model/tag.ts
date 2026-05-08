import { Schema,model,Types } from "mongoose";
const tagSchema=new Schema({
    name:{type:String,required:true,unique:true},
});

export const Tag=model("Tag",tagSchema);