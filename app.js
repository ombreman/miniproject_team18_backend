const express = require("express")
const { sequelize, User } = require("./models/index")
const adsRouter = require("./routers/ads")
const commentsRouter = require("./routers/comments")
const partiesRouter = require("./routers/parties")

// Express Settings
const app = express()
const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Sequelize Connected
sequelize.sync({ force: false })
    .then(() => console.log("Connected to MySQL."))
    .catch(err => console.error(err))

// Routers
app.get('/', async(req, res) => {
    await User.create({
        accountId: "test",
        nickname: "test",
        password: "1234"
    })
    res.send("OK")
})

app.use('/ads', adsRouter)
app.use('/ads/:adId/party', partiesRouter)
app.use('/ads/:adId/comments', commentsRouter)
app.use((_, res) => res.send("INVALID ROUTE"))

// Port 8080
app.listen(port, () => console.log("Server is running on port " + port))