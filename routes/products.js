var express = require('express');
var router = express.Router();
let productModel = require('../schemas/product');

function buildQuery(obj) {
  let result = {};
  if (obj.name) {
    result.name = new RegExp(obj.name, 'i');
  }
  result.price = {};
  if (obj.price) {
    result.price.$gte = obj.price.$gte ? obj.price.$gte : 0;
    result.price.$lte = obj.price.$lte ? obj.price.$lte : 10000;
  }
  return result;
}

router.get('/', async function(req, res, next) {
  let products = await productModel.find(buildQuery(req.query));
  res.status(200).send({ success: true, data: products });
});

router.get('/:id', async function(req, res, next) {
  try {
    let product = await productModel.findById(req.params.id);
    res.status(200).send({ success: true, data: product });
  } catch (error) {
    res.status(404).send({ success: false, message: "khong co id phu hop" });
  }
});

router.post('/', async function(req, res, next) {
  try {
    let newProduct = new productModel({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      isDeleted: false
    });
    await newProduct.save();
    res.status(200).send({ success: true, data: newProduct });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    let deletedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    res.status(200).send({ success: true, data: deletedProduct });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;
