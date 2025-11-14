import express from "express"
import dotenv from "dotenv"
import router from "./routers/router.js"
import connectDB from "./Database/connectDB.js"
import cookieparser from "cookie-parser"
import cors from "cors"
import userRouter from "./routers/auth.router.js"

const App = express()
App.use(express.json())
App.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
App.use(cookieparser())
dotenv.config()

const PORT = process.env.PORT || 6969

App.get("/hello" , (req , res) =>{
    res.status(201).json({message:"hellooo"})
})

App.use("/api" , router)
App.use("/api" , userRouter)

App.listen(PORT , () =>{
    connectDB()
    console.log(`app connected at http://localhost:${PORT}`)
})