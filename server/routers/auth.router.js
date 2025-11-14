import express from "express"
import { CreateUser, SignInUser } from "../controllers/controller.js"
import { userAuth } from "../middleware/auth.middleware.js"
const userRouter = express.Router()

userRouter.post("/signup"  , CreateUser)
userRouter.post("/signin" , SignInUser)
userRouter.post("/signout", (req , res) =>{
  res.clearCookie("token" , {httpOnly: true, secure: false , sameSite: 'lax'})
  res.status(200).json({message: "Logged out successfully"})
})

export default userRouter