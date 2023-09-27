const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const createToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
};

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
      const id = saveNewAdmin._id;
      createToken(id, res);

      res.status(200).json({ success: true });
    } else if (!saveNewAdmin) {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.loginadmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email }).select(
      "-password -__v"
    );

    if (existingAdmin) {
      const id = existingAdmin._id;
      createToken(id, res);
      existingAdmin.password = undefined;

      res.status(200).json({ success: true, data: existingAdmin });
    } else if (!existingAdmin) {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    res.status(500);
  }
};

exports.deleteadmin = async (req, res) => {
  try {
    const { email } = req.body;
    const deleteAdmin = await Admin.deleteOne({ email });

    if (deleteAdmin) {
      res.status(200).json({ success: true, data: deleteAdmin });
    } else if (!deleteAdmin) {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
