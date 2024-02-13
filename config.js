module.exports = {
    host: "localhost",
    port: 3000,
    jwtSecret: "!!CryptoCat@!!",
    jwtExpirationInSeconds: 60 * 60,
    roles: {
        USER: "user",
        ADMIN: "admin"
    },
    genders: {
        M: "male",
        F: "female",
        O: "others"
    },
    seatStatus: {
        AVAILABLE: "available",
        RESERVED: "reserved"
    },
    ticketStatus: {
        BOOKED: "booked",
        CONFIRMED: "confirmed",
        CANCELLED: "cancelled",
        BOARDING: "boarding",
        IN_TRANSIT: "in-transit",
        COMPLETED: "completed",
        REFUNDED: "refunded"
    }
}