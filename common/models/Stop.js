const { DataTypes } = require("sequelize");

const StopModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    isTerminal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("stop", StopModel);
    },

    createStop: (stop) => {
        return this.model.create(stop);
    },

    findStop: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    findAllStops: (query) => {
        return this.model.findAll({
            where: query,
        });
    },

    updateStop: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    deleteStop: (query) => {
        return this.model.destroy({
            where: query,
        });
    }
};