const categoryModel = require("../../models/categoryModel");

async function addCategory(req, res) {
    try {
        const {categoryName,description} = req.body
        if(!categoryName) {
            throw new Error("The name field is required");
        }
        const category = await categoryModel.findOne({categoryName})
        if (category) {
            throw new Error("Category already exists");
        }

        const addCategory = await categoryModel.create(req.body);

        if (!addCategory) {
            throw new Error("Something went wrong");
        }

        res.status(200).json({ status: true, data: addCategory, message: "Category created" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

module.exports = addCategory