import type { RequestHandler }  from "express"
import type {JwtPayload} from "jsonwebtoken"
import jwt from "jsonwebtoken"

interface tokenpayload extends JwtPayload {
    id:string
}

export const loginmiddleware:RequestHandler=(req,res,next)=>{

    const token =req.headers.token

    const verifytoken=jwt.verify(token as string,process.env.JWTSECRAT as string) as tokenpayload

    if(!verifytoken){
        res.status(401).json({
            massage:"unauthcated acess"
        })
    }
    req.body.userId=verifytoken.id

    next();

}