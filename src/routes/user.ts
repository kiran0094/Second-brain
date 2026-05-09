import { Router } from "express";
import { z } from "zod";
import { User } from "../model/user.ts";
import jwt from "jsonwebtoken"
import bycypt from "bcryptjs"
import { loginmiddleware } from "./loginmiddleware.ts";
import { Content } from "../model/content.ts";
const userRouter = Router();

const user=z.object({
    username:z.string().min(3).max(20),
    password:z.string().min(6).max(100),
})

const contentshema=z.object({
  type: z.enum(["document", "tweet", "youtube", "link"]),
  link: z.string().url(), // .url() ensures it is a valid web address
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
    const hashedppassword= await bycypt.hash(password,134)
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

    const token=jwt.sign({id: users._id.toString()},process.env.JWT_SECRET || 'default_secret')

    res.status(201).json({token:token,
      message:"your logged in"
     });
    }catch(error){
    res.status(500).json({ error: "Internal server error",
        message:error instanceof Error ? error.message : "Unknown error"
     });
}});

userRouter.use(loginmiddleware)

userRouter.post("/content", async(req, res) => {
    try{
    
    const parsedData = contentshema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
        
    }  
   
    const content=await Content.create(parsedData.data);
    res.status(201).json({ message: "Content created successfully", content });
    }catch(error){
    res.status(500).json({ error: "Internal server error",
        message:error instanceof Error ? error.message : "Unknown error"
     });
}    
   
});

userRouter.get("/content", async (req, res) => {
    try {
        const content = await Content.find();
       res.json({content:content,
            message:"content is delivered"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" });
    }
});
userRouter.get("/content/:id", async (req, res) => {
    try {
        const id=req.params
        const content = await Content.find({id:id});
        res.json({content:content,
            message:"content is delivered"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" });
    }
});
userRouter.delete("/content/:id", async (req, res) => {
    try {
        await Content.findByIdAndDelete(req.params.id);
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
userRouter.get("/brain/share", (req, res) => {
    // Handle content search logic here
    res.send("Content search results");
});


export default userRouter;
