const express = require("express")
const cors = require('cors')
const { sequelize, User } = require("./models/index")
const indexRouter = require("./routers/index")
const usersRouter = require("./routers/users")
const adsRouter = require("./routers/ads")
const partiesRouter = require("./routers/parties")
const commentsRouter = require("./routers/comments")
const verifyToken = require("./middleware/verifyToken")

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Sequelize Connected
sequelize.sync({ force: false })
    .then(() => console.log("Connected to MySQL."))
    .catch(err => console.error(err))


app.get('/temp', async (req, res) => {
    const userList = await User.findAll()
    return res.json(userList)
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/ads', adsRouter)
app.use('/ads/:adId/parties', verifyToken, partiesRouter)
app.use('/ads/:adId/comments', commentsRouter)
// app.use((_, res) => res.send("Happy Coding"))

app.listen(port, () => console.log("Server is running on port ", port))