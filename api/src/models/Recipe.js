const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primarikey  :true,
      allowNull: false,

    },
    summary:{
      type :DataTypes.STRING,
      allowNull: false,
    },
    level:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preparation:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
