const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  id: {
    type: Number,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

sellerSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  const maxIdSeller = await this.constructor.findOne({}, { id: 1 }).sort({
    id: -1,
  });

  this.id = maxIdSeller ? maxIdSeller.id + 1 : 0;

  next();
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
