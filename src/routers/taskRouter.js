import express from "express"
import Task from '../models/taskModel.js'
import authentication from '../middleware/authentication.js'
const router = new express.Router()

// get all tasks
router.get('/tasks', authentication, async (req, res) => {
    try {
        const tasks = await Task.find({ taskUser: req.user._id })
        console.log(tasks)
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// get task by id
router.get('/tasks/:id', authentication, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, taskUser: req.user._id })
        if (!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


//create task
router.post('/tasks', authentication, async (req, res) => {
    const task = new Task({
        ...req.body,
        taskUser: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

// delete task
router.delete('/tasks/:id', authentication, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, taskUser: req.user._id})
        console.log(task)
        if (!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// update task by id
router.patch('/tasks/:id', authentication, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates, please double check your input.'})
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, taskUser: req.user._id})
        if (!task) return res.status(404).send()
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})




export default router