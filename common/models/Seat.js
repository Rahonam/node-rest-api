const { DataTypes } = require("sequelize");
const { seatStatus } = require("../../config");

const SeatModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fare: {
        type: DataTypes.FLOAT,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: seatStatus.AVAILABLE,
    },
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("seat", SeatModel);
    },

    createSeat: (seat) => {
        return this.model.create(seat);
    },

    findSeat: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    findAllSeats: (query) => {
        return this.model.findAll({
            where: query,
        });
    },

    updateSeat: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    deleteSeat: (query) => {
        return this.model.destroy({
            where: query,
        });
    }
};