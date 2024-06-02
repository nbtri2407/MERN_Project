const categoryModel = require("../../models/categoryModel");

async function editCategory(req, res) {
  try { 
    const { _id, categoryName, description } = req.body;
    if (!_id || !categoryName || !description) {
      throw new Error("All fields are required");
    }

    const category = await categoryModel.findById(_id);
    if (
      category.categoryName === categoryName &&
      category.description === description
    ) {
      throw new Error("No changes made");
    }

    const editCategory = await categoryModel.findByIdAndUpdate(_id, {
      categoryName,
      description,
    });
    res
      .status(200)
      .json({ status: true, data: editCategory, message: "Category Updated" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = editCategory;
