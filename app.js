// tooling for HTTP servers
const express = require('express');
const app = express();

// swagger for API documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// middleware to configure CORS policy
const cors = require("cors");

// middleware to log HTTP requests
const morgan = require("morgan");

// ORM tool for databases
const { Sequelize } = require("sequelize");

// configurations
const { host, port } = require("./config");
const HOST = process.env.HOST || host;
const PORT = process.env.PORT || port;

// Routes
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const SeatRoutes = require("./seats/routes");
const StopRoutes = require("./stops/routes");
const TicketRoute = require("./tickets/routes");
const AdminRoutes = require("./admin/routes");

// Models
const UserModel = require("./common/models/User");
const SeatModel = require("./common/models/Seat");
const StopModel = require("./common/models/Stop");
const TicketModel = require("./common/models/Ticket");


// apply middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// database config
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./storage/data.db",
});

// Initialise Models
UserModel.initialise(sequelize);
SeatModel.initialise(sequelize);
StopModel.initialise(sequelize);
TicketModel.initialise(sequelize);

// sync models with database
sequelize.sync()
    .then(() => {
        console.log("Sequelize Initialised.");

        // apply app routes
        app.use("/", AuthorizationRoutes);
        app.use("/user", UserRoutes);
        app.use("/seat", SeatRoutes);
        app.use("/stop", StopRoutes);
        app.use("/ticket", TicketRoute);
        app.use("/admin", AdminRoutes);

        // listen for connections
        app.listen(PORT, ()=>{
            console.log(`Serving at http://${host}:${PORT}`);
            console.log(`Documentations at  http://${host}:${PORT}/api-docs`);
        })

        // apply documentation route
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    })
    .catch((err) => {
        console.error("Sequelize Initialisation failed: ", err);
    });