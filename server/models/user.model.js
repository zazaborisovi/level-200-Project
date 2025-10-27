import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    notes:[
        {
          name: {
            type: String,
            required: true
          } ,
          content: {
            type: String,
            required: true
          } ,
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
    ]
})

export const UserModel = mongoose.model("User" , UserSchema)