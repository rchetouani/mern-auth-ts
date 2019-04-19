const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const router = new Router();

// Get all Users
router.route("/users").get(UserController.getUsers);

export default router;
