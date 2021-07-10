const express = require("express");

const { sequelize, Comment , Ad, User} = require("./models/index")

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', async(req, res) => {
    const newComment = await Comment.create({
      content: "Hello Sequelize"
    })
    res.send(newComment)
  })

app.get('/ad', async(req, res) => {
    const newAd1 = await Ad.create({
      title: "Hello Sequelize",
      category:"tomato",
      content: " potato",
      AdId:1,
      
    })
    res.send(JSON.stringify(newAd))
  })  

app.get('/ad', async(req, res) => {
    const newAd = await newAd1.create({
      title: "Hello Sequelize",
      category:"tomato",
      content: " potato",
    
      
    })
    res.send(JSON.stringify(newAd))
  })    

  app.get('/user', async (req, res) => {
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



// 1. why updated at keep showing
// 2.  how to jasonify the sql result - done 
// 3. wtf is quary?

