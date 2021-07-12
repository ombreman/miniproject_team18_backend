
const express = require("express");
const { sequelize } = require("./models/index")
const commentsRouter = require("./routers/comments")
const adsRouter = require("./routers/ads")
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.get('/testad', async(req,res)=>{
//     const user = await User.findByPk(1)
//     const ad = await Ad.create({
//         title: "potato1",
//         category:"potato2",
//         content: " potato3",
//         participant: "here should be the users?",
//         maxPeople: 20,
//     })
//     user.addAd(ad)
//     res.send(ad)
// })
// app.get('/user', async (req, res) => {
//     const newUser = await User.create({
//         accountId: "nana",
//         nickname: "gil",
//         password: "1234"
//     })
//     res.send(newUser)
// })  
sequelize.sync({ force: false })
  .then(() => console.log("Connected to MySQL."))
  .catch((err) => console.error(err))

// Routers
app.use('/ads/:adId/comments', commentsRouter)
app.use('/ads', adsRouter)
app.use((_, res) => res.send("INVALID ROUTE"))

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});

