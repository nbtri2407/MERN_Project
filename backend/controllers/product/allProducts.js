const productModel = require("../../models/productModel");

async function allProducts(req, res) {
  const {
    price,
    category,
    length,
    handleLength,
    balancePoint,
    formatPlay,
    level,
    stiffness,
    stylePlay,
    swingweight,
    weight,
    page,
    limit,
    search,
  } = req.query;

  let filter = {};

  if (price) {
    const priceRanges = price
      .split(",")
      .map((range) => range.split("-").map(Number));
    filter.$or = priceRanges.map(([min, max]) => ({
      price: { $gte: min, $lte: max },
    }));
  }

  if (category) filter.category = { $in: category.split(",") };
  if (length) filter.length = { $in: length.split(",") };
  if (handleLength) filter.handleLength = { $in: handleLength.split(",") };
  if (balancePoint) filter.balancePoint = { $in: balancePoint.split(",") };
  if (formatPlay) filter.formatPlay = { $in: formatPlay.split(",") };
  if (level) filter.level = { $in: level.split(",") };
  if (stiffness) filter.stiffness = { $in: stiffness.split(",") };
  if (stylePlay) filter.stylePlay = { $in: stylePlay.split(",") };
  if (swingweight) filter.swingweight = { $in: swingweight.split(",") };
  if (weight) filter.weight = { $in: weight.split(",") };
  if (search) {
    const regex = new RegExp(search, "i", "g");
    filter.productName = regex;
  }

  try {

    const products1 = await productModel
      .find(filter)
      .populate("category")

    const products = await productModel
      .find(filter)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalItems = products1?.length;
    const totalPages = Math.ceil(totalItems / limit);
    res.status(200).json({
      status: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      },
      message: "All products",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = allProducts;
