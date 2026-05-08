import{Schema,model,Types}from"mongoose";

import { link } from "node:fs";

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema=new Schema({
    link:{type:String,required:true},
    type:{type:String,required:true,enum:contentTypes},
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    userId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const Content=model("Content",contentSchema);