const express = require("express");
const booksController = require("../controllers/books");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const multer = require("multer");
const multerStorage = require("../utils/uploader");

const router = express.Router();

router
  .route("/")
  .get(booksController.getAll)
  .post(authMiddleware, isAdminMiddleware,multer({ storage: multerStorage }).single("cover") , booksController.create);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, booksController.remove)
  .put(authMiddleware, isAdminMiddleware, booksController.update)
  .get(booksController.getOne);

router.route("/:id/reserve").post(authMiddleware, booksController.reserve);

router.route("/:id/delivery").post(authMiddleware, booksController.delivery);

module.exports = router;
