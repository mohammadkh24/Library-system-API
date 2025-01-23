const express = require("express");
const categoriesController = require("../controllers/categories");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .get(categoriesController.getAll)
  .post(authMiddleware, isAdminMiddleware, categoriesController.create);

router
  .route("/:id")
  .get(categoriesController.getOne)
  .delete(authMiddleware, isAdminMiddleware, categoriesController.remove)
  .put(authMiddleware , isAdminMiddleware , categoriesController.update)

module.exports = router;
