import {UserModel} from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createAndSendCookie = async (user , res ) =>{
  const token = jwt.sign({id: user._id} , process.env.JWT_SECRET)
  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
  
  const password = undefined
  
  res.cookie("token" , token, cookieOptions).json({message: "token sent"})
}

export const CreateUser = async(req , res) =>{
    console.log(req.body)
    try {
        const {username , password} = req.body
        const userExists = await UserModel.findOne({username})
        if (userExists){
            res.status(400).json({message: "User already exists"})
            return
        }

        const newUser = await UserModel.create({username, password})
        
        await createAndSendCookie(newUser , res)
    } catch (err) {
        console.error("error creating user" , err)
        res.status(400).json({message: err.message})
    }
}

export const SignInUser = async(req , res) =>{
    try {
        const {username , password} = req.body
        const User = await UserModel.findOne({username})
        if(!User){
            res.status(404).json({message: "Invalid username or password"})
            return
        }
        const match = await bcrypt.compare(password , User.password)
        console.log(password , User.password)
        if(!match){
            res.status(500).json({message: "Invalid username or password"})
        }
        const token = jwt.sign({id: User._id}, process.env.JWT_SECRET)
        res.cookie("token" , token, {httpOnly: true, secure: false , sameSite: 'lax'}).json({message: "token sent"})
        res.status(200).json({message: "Logged in successfully", token})
    } catch (err) {
        res.status(500).json({message:err})
    }
}

export const GetNotes = async(req , res) =>{
    try {
        const User = await UserModel.findById(req.userId)
        if(!User){
            res.status(404).json({message: "user not found"})
            return
        }
        res.status(200).json({notes: User.notes})
    } catch (err) {
        res.status(500).json({message:err})
    }
}

export const AddNote = async (req , res) =>{
    const { name , content } = req.body
    const note = {name , content}
    if(!name || !content){
      return res.status(400).json({message: "name and content are required"})
    }
    try {
      const user = await UserModel.findById(req.userId)
      user.notes.push(note)
      await user.save()
      return res.status(200).json({ message: "Note added successfully"})
    } catch (err) {
        res.status(500).json({message: "error " + err})
    }
}

export const DeleteNote = async (req , res) =>{
  const {name} = req.body
  try{
    const user = await UserModel.findById(req.userId)
    const noteToDelete = user.notes.findIndex((note) => note.name == name)
    user.notes.splice(noteToDelete , 1)
    await user.save()
    res.status(200).json({message: "Note Deleted Successfully"})
  }catch(err){
    res.status(500).json({message: "error" + err})
  }
}

export const UpdateNote = async (req , res) =>{
  
}