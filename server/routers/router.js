import express from "express"
import { AddNote, CreateUser, GetNotes, SignInUser } from "../controllers/controller.js"
import { userAuth } from "../middleware/userAuth.js"
const router = express.Router()

// user endpoints
router.post("/signup"  , CreateUser)
router.post("/signin" , SignInUser)
router.post("/signout", (req , res) =>{
  res.clearCookie("token" , {httpOnly: true, secure: false , sameSite: 'lax'})
  res.status(200).json({message: "Logged out successfully"})
})

// note endpoints
router.post("/addnote" , userAuth , AddNote)
router.get("/getnote", userAuth , GetNotes)

router.get("/test" , (req, res) => {
  res.status(200).json({user:{name: "John Doe", email: "john@example.com", id: "12345", age: 30}})
})

// authentication endpoint
router.get("/check/user/auth", userAuth , (req , res) =>{
  res.status(200).json({message: "Authenticated" , userId: req.userId})
})

export default router