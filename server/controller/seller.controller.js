const Seller = require("../models/sellerModel");

exports.getSeller = async (req, res) => {
  try {
    const sellers = await Seller.find().select("-password -__v");

    if (!sellers) {
      res.status(400).json({
        message: "no sellers found",
      });
    }

    res.status(200).json({
      success: true,
      data: sellers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      success: false,
    });
  }
};

exports.createSeller = async (req, res, next) => {
  try {
    const newSellerData = req.body;

    const newSeller = await Seller.create(newSellerData);

    if (newSeller) {
      res.status(201).json({
        success: true,
        data: newSeller,
      });
    } else if (!newSeller) {
      res.status(404).json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      success: false,
    });
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSeller = await Seller.deleteOne({ _id: id });
    if (deleteSeller) {
      res.status(200).json({
        success: true,
        data: deleteSeller,
      });
    } else if (!deleteSeller) {
      res.status(404).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.banSeller = async (req, res, next) => {
  try {
    const { id } = req.body;

    const docToBeUpdated = await Seller.findByIdAndUpdate(
      { _id: id },
      { active: false }
    );

    if (docToBeUpdated) {
      res.status(201).json({
        success: true,
        data: docToBeUpdated,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

exports.unbanSeller = async (req, res, next) => {
  try {
    const { id } = req.body;

    const docToBeUpdated = await Seller.findByIdAndUpdate(
      { _id: id },
      { active: true }
    );

    if (docToBeUpdated) {
      res.status(201).json({
        success: true,
        data: docToBeUpdated,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
