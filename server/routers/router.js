import express from "express"
import { AddNote, CreateUser, SignInUser } from "../controllers/controller.js"
import { userAuth } from "../middleware/userAuth.js"
const router = express.Router()

router.post("/signup"  , CreateUser)
router.post("/signin" , SignInUser)
router.post("/addnote" , userAuth , AddNote)
router.get("/test" , (req, res) => {
  res.status(200).json({user:{name: "John Doe", email: "john@example.com", id: "12345", age: 30}})
})
router.get("/check/user/auth", userAuth , (req , res) =>{
  res.status(200).json({message: "Authenticated" , userId: req.userId})
})

export default router