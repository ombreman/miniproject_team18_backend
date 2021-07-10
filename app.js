const express = require("express");
const { sequelize, User } = require("./models/index")

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', async (req, res) => {
    const newUser = await User.create({
        userId: "nana",
        nickname: "gil",
        password: "1234"
    })
    res.send(newUser)
})

sequelize.sync({ force: false })
    .then(() => console.log("Connected to MySQL."))
    .catch((err) => console.error(err))

app.listen(8080, () => {
    console.log("서버가 켜졌어요!");
});