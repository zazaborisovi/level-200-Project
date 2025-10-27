import mongoose from "mongoose"

const ToDoSchema = new mongoose.Schema({
    todo: {type:Array},
    done: {type: Array}
})

export const ToDoModel = new mongoose.model("TODO" , ToDoSchema)