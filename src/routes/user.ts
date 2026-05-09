import { Router } from "express";
import { z } from "zod";
import { User } from "../model/user.ts";
import jwt from "jsonwebtoken"
import bycypt from "bcryptjs"
import { loginmiddleware } from "./loginmiddleware.ts";
const userRouter = Router();

const user=z.object({
    username:z.string().min(3).max(20),
    password:z.string().min(6).max(100),
})


userRouter.post("/signup", async(req, res) => {
    try{
    const data = user.parse(req.body);
    const parsedData = user.safeParse(data);
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

userRouter.post("/content", (req, res) => {
    // Handle content creation logic here
    res.send("Content created successfully");
});
userRouter.get("/content", (req, res) => {
    // Handle content retrieval logic here
    res.send("Content retrieved successfully");
});
userRouter.delete("/content/:id", (req, res) => {
    // Handle content deletion logic here
    res.send("Content deleted successfully");
});
userRouter.put("/content/:id", (req, res) => {
    // Handle content update logic here
    res.send("Content updated successfully");
});
userRouter.get("/brain/share", (req, res) => {
    // Handle content search logic here
    res.send("Content search results");
});


export default userRouter;
