import {UserModel} from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const CreateUser = async(req , res) =>{
    console.log(req.body)
    try {
        const {username , password} = req.body
        const userExists = await UserModel.findOne({username})
        if (userExists){
            res.status(400).json("User already exists")
            return
        }
        const hashPass = await bcrypt.hash(password , 10)
        const newUser = await UserModel.create({username: username , password: hashPass})
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
        res.cookie("token" , token, {httpOnly: true, secure: false , sameSite: 'lax'}).json({message: "token sent"})
    } catch (err) {
        console.error("error creating user" , err)
        res.status(400).json({errord: err.message})
    }
}

export const SignInUser = async(req , res) =>{
    try {
        const {username , password} = req.body
        const User = await UserModel.findOne({username})
        if(!User){
            res.status(404).json({message: "user not found"})
            return
        }
        const match = await bcrypt.compare(password , User.password)
        console.log(password , User.password)
        if(!match){
            res.status(500).json({message: "incorrect password"})
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
    const { note } = req.body
    if(!note || note.trim().length === 0){
        res.status(400).json({message: "note is required"})
        return
    }
    try {
      const user = await UserModel.findByIdAndUpdate(
        req.userId,
        {$push: { todos: note }}, // pushes the note to the users note array
        { new: true } // updates the user document with the new note array
      )
      return res.status(200).json({ message: "Note added successfully"})
    } catch (err) {
        res.status(500).json({message: "error " + err})
    }
}

export const DeleteNote = async (req , res) =>{
  
}

export const UpdateNote = async (req , res) =>{
  
}