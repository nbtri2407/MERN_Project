const productModel = require("../../models/productModel");
const categoryModel = require("../../models/categoryModel");

async function addProduct(req, res) {
  try {
    if (
      !req.body.productName ||
      !req.body.price ||
      !req.body.sellingPrice ||
      !req.body.quantity ||
      !req.body.category
    ) {
      throw new Error("All fields are required");
    }

    const newProduct = await productModel.create(req.body);

    const category = await categoryModel.findById(newProduct.category);

    if (!category) {
      throw new Error("Category not found");
    }

    newProduct
      .save()
      .then((product) => {
        return categoryModel
          .findByIdAndUpdate(
            product.category,
            { $push: { products: product._id } },
            { new: true, useFindAndModify: false }
          )
          .then(() => product);
      })
      .then((product) => {
        res
          .status(200)
          .json({ status: true, data: product, message: "Product Added" });
      })
      .catch((err) => {
        res.status(500).json({ status: false, message: err.message });
      });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = addProduct;
