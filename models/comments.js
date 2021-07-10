// const {DataTypes } = require('sequelize');
// // const sequelize = new Sequelize('sqlite::memory:');
// //const db = require("./index")
// // const {sequelize}  = db
// const {sequelize} = require("./index")
// console.log(require("./index"), "line 6 here here")
// console.log(sequelize, "from comment js  ")
// // sequlize.define(modelName, sttributes, options)
// // model : Comment  ,  Table : Comments (freezeTableName: false)
module.exports = function (sequelize, DataTypes) {
const Comment = sequelize.define('Comment', {
    // Model attributes are defined here
    content: {
      type: DataTypes.TEXT,
      defaultValue: "hi this is "
    },
},
   {
    timestamps: true,
    updateAt: false,
    charset: 'utf8mb4',  //mb4=>emoji
    collate: 'utf8mb4_general_ci'// search
   });
  // `sequelize.define` also returns the model
  //console.log(Comment === sequelize.models.comment); // true
  //module.exports = Comment 
  return Comment
}
/*
1. define this models 2hrs


 post can have many coments
 user can have many comments 
 commnet can have only one postiD
 comment can have only one nickName


2. connect with express app 2hrs
3. test dummy data 2hrs


q: 1. where do i put the "assocication"
   2. utf8? following the schema from workbench?
   3.       underscored: false,
                        modelName: 'Comment', // no need
                        tableName: 'comments', // no need
                        paranoid: false,  // enable hard delete ?  but default is false 
            charset: 'utf8mb4',  //mb4=>emoji
            collate: 'utf8mb4_general_ci'// search
 */

             // nickName: {
    //   type: DataTypes.STRING(20),
    //   allowNull: false,
    //   // allowNull defaults to true
    // }, 
    // postId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
         
    // }