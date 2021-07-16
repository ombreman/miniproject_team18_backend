
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

