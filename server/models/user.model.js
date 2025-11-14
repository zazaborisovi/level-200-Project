import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        minLength: 8,
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

UserSchema.pre("save", async function (next){
  if(!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

UserSchema.methods.generateAuthToken = async function(){
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET ,{expiresIn: process.env.JWT_EXPIRES_IN})
}

export const UserModel = mongoose.model("User" , UserSchema)