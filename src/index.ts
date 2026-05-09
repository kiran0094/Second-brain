import  Express  from "express";
import userRouter from "./routes/user.ts"
import dotenv from "dotenv";
import mongoose  from "mongoose";

dotenv.config();

const app = Express();
app.use("/api/v1", userRouter);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/brainly",)
function main() {
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
}
main();
