const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProductData = req.body;

    const newProduct = await Product.create(newProductData);

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.deleteOne({ _id: id });

    if (deleteSeller) {
      res.status(200).json({
        success: true,
        data: deletedProduct,
      });
    } else if (!deletedProduct) {
      res.status(404).json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
    });
  }
};
