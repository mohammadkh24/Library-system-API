const express = require("express");
const usersController = require("../controllers/auth");

const router = express.Router();

router.route("/register").post(usersController.register);
router.route("/login").post(usersController.login);
router.route("/:id/getMe").get(usersController.getMe)

module.exports = router