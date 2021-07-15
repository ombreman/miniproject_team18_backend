const express = require("express")
const cors = require("cors")
const AccessControlAllowOrigin = require("./middleware/Access-Control-Allow-Origin")
const verifyToken = require("./middleware/verifyToken")
const { sequelize } = require("./models/index")
const indexRouter = require("./routers/index")
const adsRouter = require("./routers/ads")
const usersRouter = require("./routers/users")
const commentsRouter = require("./routers/comments")
const partiesRouter = require("./routers/parties")

const app = express()
const port = 3000

// Middlewares
app.use(cors())
app.use(AccessControlAllowOrigin())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Sequelize Connected
sequelize.sync({ force: false })
    .then(() => console.log("Connected to MySQL."))
    .catch(err => console.error(err))

// Routers
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/ads', adsRouter)
app.use('/ads/:adId/parties', verifyToken, partiesRouter)
app.use('/ads/:adId/comments', commentsRouter)

// port 3000
app.listen(port, () => console.log("Server is running on port ", port))