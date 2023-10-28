const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");

exports.getProducts = async (req, res) => {
  try {
    const productDocuments = await Product.find().populate("seller", "name");

    if (productDocuments) {
      res.status(200).json({
        success: true,
        data: productDocuments,
      });
    } else {
      res.status(500).json({
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

exports.createProduct = async (req, res) => {
  try {
    const newProductData = req.body;
    const seller = await Seller.findOne({ _id: newProductData.seller });

    if (seller) {
      if (seller.active) {
        const newProduct = await Product.create(newProductData);
        seller.totalProducts += 1;
        await seller.save();

        res.status(201).json({
          success: true,
          data: newProduct,
        });
      } else {
        res.status(404).json({
          success: false,
        });
      }
    } else {
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
