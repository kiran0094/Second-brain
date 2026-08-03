import type { RequestHandler }  from "express"
import type {JwtPayload} from "jsonwebtoken"
import jwt from "jsonwebtoken"

interface tokenpayload extends JwtPayload {
    id:string
}

export const loginmiddleware:RequestHandler=(req,res,next)=>{

    const token = req.cookies?.token;

    const verifytoken=jwt.verify(token as string,process.env.JWTSECRAT as string) as tokenpayload

    if(!verifytoken){
        res.status(401).json({
            message:"unauthorized access"
        })
    }
    req.headers.userId=verifytoken.id

    next();

}