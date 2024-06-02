const categoryModel = require("../../models/categoryModel");

async function allCategories(req, res) {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    if (page && limit) {
      const categoriesList = await categoryModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);

      const totalItems = await categoryModel.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);

      res.status(200).json({
        status: true,
        data: categoriesList,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
        },
        message: "All Categories",
      });
    } else {
      const categoriesList = await categoryModel.find();
      res.status(200).json({
        status: true,
        data: categoriesList,
        message: "All Categories",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = allCategories;
