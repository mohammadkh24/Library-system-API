const express = require("express");
const usersController = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, usersController.getAll);
router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, usersController.remove);
router
  .route("/setcrime/:id")
  .put(authMiddleware, isAdminMiddleware, usersController.setCrime);

router.route("/:id/role").put(usersController.changeRole);

module.exports = router;
