module.exports = function (sequelize, DataTypes) {
    const Ad = sequelize.define('Ad', {
       // id => primary key  auto generated , created at => auto generated

        title: {
          type: DataTypes.TEXT
        
        },
    
        category: {
            type: DataTypes.STRING,
            defaultValue: " CS "
        },

        content: {
            type: DataTypes.TEXT,
            
        },
    },
       {
        timestamps: true,
        updateAt: false,
        charset: 'utf8mb4',  //mb4=>emoji
        collate: 'utf8mb4_general_ci'// search
       });
  
      return Ad

      
    }

    // one nicakname can have many ads
    // ad can have many comments