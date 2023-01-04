const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('diet', {
        id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [
                [
                  "gluten free",
                  "dairy free",
                  "ketogenic",
                  "lacto ovo vegetarian",
                  "vegan",
                  "pescatarian",
                  "paleolithic",
                  "primal",
                  "fodmap friendly",
                  "whole 30",
                ],
              ],
            }
          },
    },{
        timestamps: false
    });
};