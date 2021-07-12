
const express = require("express");
const ads = require("./models/ads");
const { sequelize, Comment , Ad, User} = require("./models/index")
const commentsRouter = require("./routers/comments")

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/ads', async (req, res) => {
  const { category } = req.query;
  if (category){
    const ads = await Ad.findAll({ where:{category:category }}); 
    res.json(ads)
  }
  else{ const ads = await Ad.findAll();
    console.log(ads);
    res.json(ads)
  }

});


app.post('/ads', async (req,res)=>{
  const {title,category,content,participant,maxPeople} = req.body
  console.log(req.body)
  const nickname = "gil"
  const user = await User.findOne({where: {nickname: nickname}})
  console.log(user)

   try {
  const newPost = await Ad.create({
    title,
    nickname,
    category,
    content,
    participant,
    maxPeople
  })
  user.addAd(newPost)
  res.send("okay")
  } catch (error) {
    res.send("errror msg")({
      errorMeassage: "Can not post this"
    })
  }
})

app.put("/ads/:adId", async(req,res)=>{

  const {adId} = req.params
  const {title, content} = req.body
  const updatedAd = await Ad.update({ title:title, content:content},{
    where:{
      id :adId,
    }
  })
  res.send(updatedAd)
})

app.delete('/ads/:adId', async (req,res)=>{
  const {adId} = req.params
  const user = await Ad.destroy({where: {id : adId}})
  res.status(200).send("successfully deleted")
  
})



app.get('/testad', async(req,res)=>{
    const user = await User.findByPk(1)
    const ad = await Ad.create({
        title: "potato1",
        category:"potato2",
        content: " potato3",
        participant: "here should be the users?",
        maxPeople: 20,
    })
    user.addAd(ad)
    res.send(ad)
})


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
app.use((_, res) => res.send("INVALID ROUTE"))

app.listen(8080, () => {

  console.log("서버가 켜졌어요!");
}); 

