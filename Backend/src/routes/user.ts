import { Router } from "express";
import { z } from "zod";
import { User } from "../model/user.ts";
import { Tag } from "../model/tag.ts";
import jwt from "jsonwebtoken"
import bycypt from "bcryptjs"
import { loginmiddleware } from "./loginmiddleware.ts";
import { Content } from "../model/content.ts";
import {Link} from "../model/link.ts";
import bcrypt from "bcryptjs";
import { random } from "../utils.ts";
const userRouter = Router();

const user=z.object({
    username:z.string().min(3).max(20),
    password:z.string().min(6).max(100),
})

const contentshema=z.object({
  type: z.enum(["document", "tweet", "youtube", "link"]),
  link: z.url(), // .url() ensures it is a valid web address
  title: z.string().min(1, "Title is required"),
  tags: z.array(z.string())
})


userRouter.post("/signup", async(req, res) => {
    try{
    const parsedData = user.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
        
    }
    
    const {username,password}=parsedData.data
    const hashedppassword= await bcrypt.hash(password,10)
    console.log(parsedData.data)
    const users=await User.create({username:username,password:hashedppassword});
    res.status(201).json({ message: "User created successfully", users });
    }catch(error){
    res.status(500).json({ error: "Internal server error",
        message:error instanceof Error ? error.message : "Unknown error"
     });
}

});

userRouter.post("/login", async(req, res) => {
    try{
    const data = user.parse(req.body);
    const parsedData = user.safeParse(data);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
        
    }
    const {username,password}=data
    const hashedppassword=bycypt.hash(password,134)
    const users=await User.findOne({username:username});
    if(!users){
        return res.status(401).json({ error: "Invalid username" });
    }
    const matchpassword=bycypt.compare(password,users?.password)
     if(!matchpassword){
        return res.status(401).json({ error: "Invalid  password" });
    }

    const token=jwt.sign({id: users._id.toString()},process.env.JWTSECRAT as string)

    res.status(201).json({token:token,
      message:"your logged in"
     });
    }catch(error){
    res.status(500).json({ error: "Internal server error",
        message:error instanceof Error ? error.message : "Unknown error"
     });
}});

userRouter.get("/brain/:sharelink", async (req, res) => {
    const hash = req.params.sharelink;
    const link = await Link.findOne({ link: hash })
    if (!link) {
        return res.status(404).json({ error: "Link not found" });
    }
    const content = await Content.find({ userId: link.useref._id })
    const user = await User.findById(link.useref._id)
    res.json({ 
         user:user?.username,
         content:content,
         message:"content is delivered"
     });  
   
});

userRouter.use(loginmiddleware)

userRouter.post("/content", async (req, res) => {
  try {
    const parsedData = contentshema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        error: parsedData.error.format()
      });
    }

    // Find existing tags or create new ones
    const tagIds = await Promise.all(
      parsedData.data.tags.map(async (tagName) => {
        let tag = await Tag.findOne({ name: tagName });

        if (!tag) {
          tag = await Tag.create({ name: tagName });
        }

        return tag._id;
      })
    );

    const content = await Content.create({
      link: parsedData.data.link,
      type: parsedData.data.type,
      title: parsedData.data.title,
      tags: tagIds,
      userId: req.headers.userId as string // Preferably get this from JWT middleware
    });

    return res.status(201).json({
      success: true,
      message: "Content created successfully",
      content
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});


userRouter.get("/content", async (req, res) => {
    try {
        const userIdHeader = Array.isArray(req.headers.userId)
            ? req.headers.userId[0]
            : req.headers.userId;

        if (!userIdHeader) {
            return res.status(401).json({ error: "Missing user id" });
        }

        const content = await Content.find({ userId: userIdHeader as any }).populate("userId", "username");
        res.json({content:content,
            message:"content is delivered"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" });
    }
});
userRouter.get("/content/:id", async (req, res) => {
    try {
        const id=req.params.id
         const userIdHeader = Array.isArray(req.headers.userId)
            ? req.headers.userId[0]
            : req.headers.userId;

        if (!userIdHeader) {
            return res.status(401).json({ error: "Missing user id" });
        }
        const content = await Content.find({ _id: id, userId: userIdHeader }).populate("userId", "username");
        res.json({content:content,
            message:"content is delivered"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" });
    }
});
userRouter.delete("/content/:id", async (req, res) => {
    try {
        await Content.findByIdAndDelete({ _id: req.params.id, userId: req.headers.userId });
        res.json({ message: "Content deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" });
    }
});

userRouter.put("/content/:id", (req, res) => {
    try{
        const parsedData = contentshema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
        
    }
        const data =Content.findByIdAndUpdate(req.params.id, parsedData.data, { new: true });
        res.json({ message: "Content updated successfully", data });


    }
    catch(error){
      res.status(500).json({ error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" });

    }
});
userRouter.post("/brain/share", async (req, res) => {
    try{
    const sharedContent = req.body.share;
    const userIdHeader = Array.isArray(req.headers.userId)
            ? req.headers.userId[0]
            : req.headers.userId;

        if (!userIdHeader) {
            return res.status(401).json({ error: "Missing user id" });
        }
    const existingLink = await Link.findOne({ useref: userIdHeader as any });
    if (existingLink) {
        return res.status(400).json({ error: "Share link already exists",
            link: existingLink.link
        });
    }
    let newLink;
    if(sharedContent){
       newLink = await Link.create({useref:userIdHeader,link:random(10)})
    }
    else{
       await Link.deleteOne({useref:userIdHeader})
    }
         
    res.status(200).json({ message: "share link is updated", link: newLink?.link });
    }catch(error){
        res.status(500).json({ error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" });
    }
});


export default userRouter;
