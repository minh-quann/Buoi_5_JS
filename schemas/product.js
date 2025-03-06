let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageURL: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true }); 

module.exports = mongoose.model('product', productSchema);
