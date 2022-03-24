const { Sequelize, DataTypes } = require("@sequelize/core");
const sequelize = require("../util/database");

const Interest = sequelize.define("interest", {
         
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            phonenumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            customerinterests: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            }
            
});
module.exports = Interest;
