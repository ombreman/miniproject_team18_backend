const express = require("express")
const { Ad, User} = require("./models/index")
const router = express.Router()



router.get('/', async (req, res) => {
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
  
  
router.post('/', async (req,res)=>{
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
  
router.put("/:adId", async(req,res)=>{
  
    const {adId} = req.params
    const {title, content} = req.body
    const updatedAd = await Ad.update({ title:title, content:content},{
      where:{
        id :adId,
      }
    })
    res.send(updatedAd)
})
  
router.delete('/:adId', async (req,res)=>{
    const {adId} = req.params
    const user = await Ad.destroy({where: {id : adId}})
    res.status(200).send("successfully deleted")   
})

module.exports = router