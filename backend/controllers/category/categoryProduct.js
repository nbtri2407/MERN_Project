const productModel = require("../../models/productModel");

async function categoryProduct(req, res) {
  try {
    const _id = req.body._id;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (page && limit) {
      const products = await productModel
        .find({ category: _id })
        .populate("category")
        .skip((page - 1) * limit)
        .limit(limit);

      const totalItems = await productModel.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);

      res.status(200).json({
        status: true,
        data: products,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
        },
        message: "All Categories",
      });
    } else {
      const products = await productModel
        .find({ category: _id })
        .populate("category");

      res.status(200).json({
        status: true,
        data: products,
        message: "All Categories",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = categoryProduct;
