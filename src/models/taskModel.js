import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }, 
    taskUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

taskSchema.pre('save', async function (next) {
    const task = this
    next()
})

const Task = mongoose.model('Task', taskSchema)

export default Task