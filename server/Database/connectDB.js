import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MongoDB_URI)
        console.log("MongoDB connected at :" , conn.connection.host)
    } catch (err) {
        console.log(err)
    }
}

export default connectDB