import express from "express"
import { AddNote, CreateUser, DeleteNote, GetNotes, SignInUser } from "../controllers/controller.js"
import { userAuth } from "../middleware/auth.middleware.js"
const router = express.Router()

// user endpoints


// note endpoints
router.post("/addnote" , userAuth , AddNote)
router.get("/getnote", userAuth , GetNotes)
router.post("/deletenote" , userAuth , DeleteNote)

router.get("/test" , (req, res) => {
  res.status(200).json({user:{name: "John Doe", email: "john@example.com", id: "12345", age: 30}})
})

// authentication endpoint
router.get("/check/user/auth", userAuth , (req , res) =>{
  res.status(200).json({message: "Authenticated" , userId: req.userId})
})

export default router