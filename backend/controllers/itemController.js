const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");

// Create Item
const createItem = asyncHandler(async (req, res) => {
  const { barcode, name, sku, category} = req.body;

  //   Validation
  if (!barcode || !name || !category) {
    res.status(400);
    throw new Error("Please fill in required fields");
  }

  // Create item
  const item = await Item.create({
    user: req.user.id,
    barcode,
    name,
    sku,
    category,
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
  console.log("hi");
  await item.deleteOne();
  res.status(200).json({ message: "Item deleted." });
});

// Update Item
const updateItem = asyncHandler(async (req, res) => {
  const { barcode, name, category } = req.body;
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

  // Update Item
  const updatedItem = await Item.findByIdAndUpdate(
    { _id: id },
    {
        barcode,
        name,
        category,
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