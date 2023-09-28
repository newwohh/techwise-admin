const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Basic cell phone", "Smartphone", "Flip phone", "Foldable phone"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Seller is required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: 0,
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
