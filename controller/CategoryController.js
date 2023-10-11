import Category from "../models/Category.js";

class categoryController {
    async addCategory(req, res) {
        const data = req.body;
        try {
            const newCategory = await new Category(data).save();
            res.status(200).json(newCategory);
        } catch (err) {
            res.send(err);
        }
    }

    async getCategoryById(req, res) {
        const { id } = req.params;
        try {
            const category = await Category.findById(id);
            if (!category) {
                res.send({ message: "product not found" });
            } else {
                res.status(200).json(category);
            }
        } catch (err) {
            res.send(err);
        }
    }

    async getAllCategory(req, res) {
        try {
            const category = await Category.find({});
            if (!category) {
                res.send({ message: " no product exist !!" });
            } else {
                res.status(200).json(category);
            }
        } catch (err) {
            res.send(err);
        }
    }

    async updateCategory(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updateCategory = await Category.findByIdAndUpdate(id, data);
            res.status(200).json(updateCategory);
        } catch (err) {
            res.send(err);
        }
    }

    async deleteCategory(req, res) {
        const { id } = req.params;
        try {
            const category = await Category.findByIdAndDelete(id);
            res.status(200).json(category);
        } catch (err) {
            res.send(err);
        }
    }
}
const CategoryController = new categoryController();

export default CategoryController;
