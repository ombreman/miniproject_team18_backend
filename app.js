const express = require("express");
const { sequelize } = require("./models/index")

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {res.send("<h1>Hello!</h1>")})

sequelize.sync({ force: false })
    .then(() => console.log("Connected to MySQL."))
    .catch((err) => console.error(err))


app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
}); 



