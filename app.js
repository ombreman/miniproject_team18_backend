<<<<<<< HEAD

const express = require("express");
const { sequelize, User } = require("./models/index")
const commentsRouter = require("./routers/comments")
const adsRouter = require("./routers/ads")
const usersRouter = require("./routers/users")
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const cors = require("cors")
app.use(cors())
app.get('/user', async (req, res) => {
  const newUser = await User.create({
    accountId: "nana",
    nickname: "gil",
    password: "1234"
  })
  res.send(newUser)
})
sequelize.sync({ force: false })
  .then(() => console.log("Connected to MySQL."))
  .catch((err) => console.error(err))

// Routers
app.use('/ads/:adId/comments', commentsRouter)
app.use('/ads', adsRouter)
app.use('/users', usersRouter)
//app.use((_, res) => res.send("INVALID ROUTE"))

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});

=======
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
>>>>>>> bcd0346f35691e92d554e1ded3cbf5e6c40f3b66
