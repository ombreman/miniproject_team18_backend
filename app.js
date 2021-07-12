const express = require("express")
const { sequelize, Ad, User, Comment } = require("./models/index")

// Express Settings
const app = express()
const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Main Board Page
app.get('/ads', async (req, res) => {
    const ads = await Ad.findAll();
    console.log(ads);
    res.json(ads);
});

//Main Board Page Filter
app.get('/ads', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const ads = await Ad.findAll({ where: {category: category} });
        res.json(ads);
    } else {
        const ads = await Ad.findAll();
        res.json(ads);
    }
});

// Sequelize Connected
sequelize.sync({ force: false })
    .then(() => console.log("Connected to MySQL."))
    .catch(err => console.error(err))

// Port 8080
app.listen(port, () => console.log("Server is running on port " + port))