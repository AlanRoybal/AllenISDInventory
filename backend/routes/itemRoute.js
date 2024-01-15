const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createItem,
  getItems,
  getItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createItem);
router.patch("/:id", protect, upload.single("image"), updateItem);
router.get("/", protect, getItems);
router.get("/:id", protect, getItem);
router.delete("/:id", protect, deleteItem);

module.exports = router;