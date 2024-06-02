const categoryModel = require("../../models/categoryModel");

async function deleteCategory(req, res) {
  try {
    const { _id } = req.body;

    const deleteCategory = await categoryModel.findByIdAndDelete(_id);

    if (!deleteCategory) {
      throw new Error("Category not found");
    }

    res
      .status(200)
      .json({
        status: true,
        data: deleteCategory,
        message: "Category Deleted",
      });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}


module.exports = deleteCategory