const express = require("express");
const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth")
const isAdminMiddleware = require("../middlewares/isAdmin")

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/:id/getMe").get(authController.getMe)

module.exports = router