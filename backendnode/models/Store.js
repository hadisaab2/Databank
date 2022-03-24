const { Sequelize, DataTypes } = require("@sequelize/core");
const sequelize = require("../util/database");

const Store = sequelize.define("store", {
         
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            storename: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phonetype: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            categoryname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            industry: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            }
});
module.exports = Store;
