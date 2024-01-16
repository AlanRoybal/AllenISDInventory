const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Item
const createItem = asyncHandler(async (req, res) => {
  const { barcode, name, sku, category, quantity, description } = req.body;

  //   Validation
  if (!barcode || !name || !category || !description) {
    res.status(400);
    throw new Error("Please fill in required fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create item
  const item = await Item.create({
    user: req.user.id,
    barcode,
    name,
    sku,
    category,
    quantity,
    description,
    image: fileData,
  });

  res.status(201).json(item);
});

// Get all Items
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(items);
});

// Get single item
const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  // if item doesnt exist
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  // Match item to its user
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(item);
});

// Delete item
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  // if item doesnt exist
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  // Match item to its user
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await item.remove();
  res.status(200).json({ message: "Item deleted." });
});

// Update Item
const updateItem = asyncHandler(async (req, res) => {
  const { barcode, name, category, quantity, description } = req.body;
  const { id } = req.params;

  const item = await Item.findById(id);

  // if item doesnt exist
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  // Match item to its user
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Item
  const updatedItem = await Item.findByIdAndUpdate(
    { _id: id },
    {
        barcode,
        name,
        category,
        quantity,
        description,
        image: Object.keys(fileData).length === 0 ? item?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedItem);
});

module.exports = {
  createItem,
  getItems,
  getItem,
  deleteItem,
  updateItem,
};