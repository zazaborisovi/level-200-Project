import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.model.js"

export const userAuth = async(req , res , next) =>{
    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.userId = decoded.id
        
        const user = await UserModel.findById(req.userId)
        
        if(!user){
          return next(AppError("the user belonging to this token does not exist", 401))
        }
        
        req.user = user
        
        next()
    } catch (err) {
        return res.status(401).json({message: "Unauthorized"})
    }
}