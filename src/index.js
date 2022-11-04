import express from 'express'
import './db/mongoose.js'
import userRouter from './routers/userRouter.js'
import taskRouter from './routers/taskRouter.js'

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})