const { Sequelize, DataTypes } = require("@sequelize/core");
const sequelize = require("../util/database");

const Event = sequelize.define("event", {
            Id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            startdate: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            enddate: {
                type: DataTypes.TEXT,
                allowNull: true,
            }

}, {
    timestamps: false
}  
);
module.exports = Event;
