const Admin = require("../models/adminModel");

exports.newadmin = async (req, res) => {
  console.log(req.email);
  try {
    const { email, password, name } = req.body;

    const saveNewAdmin = await Admin.create({
      email,
      password,
      name,
    });

    if (saveNewAdmin) {
      res.status(200).json({ success: true, data: saveNewAdmin });
    } else if (!saveNewAdmin) {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getadmin = async (req, res) => {
  try {
    const admin = await Admin.find();
  } catch (error) {
    res.status(500);
  }
};
