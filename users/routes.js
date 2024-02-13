const router = require("express").Router();
const { roles } = require("../config");

// Controllers
const UserController = require("./controllers/userController");

// Middlewares
const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

// Schemas
const createUserPayload = require("./schemas/createUserPayload");
const updateUserPayload = require("./schemas/updateUserPayload");

router.get(
    "/",
    [
        IsAuthenticatedMiddleware.check,
    ],
    UserController.getAllUsers
);

router.get(
    "/:userId",
    [
        IsAuthenticatedMiddleware.check,
    ],
    UserController.getUserById
);

/**create user on register */
// router.post(
//     "/",
//     [
//         IsAuthenticatedMiddleware.check,
//         CheckPermissionMiddleware.has(roles.ADMIN),
//         SchemaValidationMiddleware.verify(createUserPayload),
//     ],
//     UserController.createUser
// );

router.patch(
    "/:userId",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
        SchemaValidationMiddleware.verify(updateUserPayload),
    ],
    UserController.updateUser
);

router.delete(
    "/:userId",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
    ],
    UserController.deleteUser
);

module.exports = router;