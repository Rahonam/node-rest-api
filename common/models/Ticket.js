const { DataTypes } = require("sequelize");
const { ticketStatus } = require("../../config");

const UserModel = require("./User");
const SeatMOdel = require("./Seat");
const StopModel = require("./Stop");

const TicketModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: "id"
        }
    },
    seatId: {
        type: DataTypes.INTEGER,
        references: {
            model: SeatMOdel,
            key: "id"
        }
    },
    fromStopId: {
        type: DataTypes.INTEGER,
        references: {
            model: StopModel,
            key: "id"
        }
    },
    toStopId: {
        type: DataTypes.INTEGER,
        references: {
            model: StopModel,
            key: "id"
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: ticketStatus.BOOKED,
    },
    comments: {
        type: DataTypes.TEXT("medium"),
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("ticket",TicketModel);
    },

    createTicket: (ticket) => {
        return this.model.create(ticket);
    },

    findTicket: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    findAllTickets: (query) => {
        return this.model.findAll({
            where: query,
        });
    },

    updateTicket: (query, updatedValue) => {
        return this.model.upadte(updatedValue,{
            where: query,
        });
    },

    deleteTicket: (query) => {
        return this.model.destroy({
            where: query,
        });
    }
};