import{Schema,model,Types}from"mongoose";


const contentTypes = ['image', 'video', 'article', 'audio', 'document', 'tweet', 'youtube', 'link']; // Extend as needed

const contentSchema=new Schema({
    link:{type:String,required:true},
    type:{type:String,required:true,enum:contentTypes},
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    userId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const Content=model("Content",contentSchema);