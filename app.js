const express = require("express")
const { sequelize } = require("./models/index")
const commentsRouter = require("./routers/comments")

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
app.use('/ads/:adId/comments', commentsRouter)
app.use((_, res) => res.send("INVALID ROUTE"))

// Port 8080
app.listen(port, () => console.log("Server is running on port " + port))
