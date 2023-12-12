import Product from "../models/Product.js";
import Category from "../models/Category.js";

class ProductControler {
    addProduct(req, res) {
        const data = req.body;
        const newProduct = new Product(data);
        newProduct
            .save()
            .then((product) => {
                res.json(product);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findById(id).populate("category_id");
            if (!product) {
                res.send({ message: "product not found" });
            } else {
                res.status(200).json(product);
            }
        } catch (err) {
            res.send(err);
        }
    }

    async getAllProduct(req, res) {
        try {
            const product = await Product.find({}).populate("category_id");
            if (!product) {
                res.send({ message: " no product exist !!" });
            } else {
                res.status(200).json(product);
            }
        } catch (err) {
            res.send(err);
        }
    }

    async searchProduct(req, res) {
        const { searchQuery } = req.query; 
        try {
            if (!searchQuery) {
                return res
                    .status(400)
                    .json({ message: "Search query is required." });
            }

            const products = await Product.find({
                $or: [
                    { name: { $regex: new RegExp(searchQuery, "i") } },
                    { description: { $regex: new RegExp(searchQuery, "i") } },
                ],
            }).populate("category_id");

            if (products.length === 0) {
                return res
                    .status(404)
                    .json({ message: "No matching products found." });
            }

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({
                message: "Internal server error",
                error: err,
            });
        }
    }

    async getfirstProducts(req, res) {
        try {
            const products = await Product.find({})
                .limit(3)
                .populate("category_id");

            if (products.length === 0) {
                return res.status(404).json({ message: "No products found." });
            }

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: "Internal server error." });
        }
    }

    async getAllProductByCategories(req, res) {
        const categoryName = req.params.id; 

        try {
            const category = await Category.findOne({ name: categoryName });
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            const products = await Product.find({
                category_id: category._id,
            }).populate("category_id");

            if (!products) {
                return res
                    .status(201)
                    .json({ message: "No products in this category" });
            }
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updateProduct = await Product.findByIdAndUpdate(id, data);
            res.status(200).json(updateProduct);
        } catch (err) {
            res.send(err);
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findByIdAndDelete(id);
            res.status(200).json(product);
        } catch (err) {
            res.send(err);
        }
    }
}

const productController = new ProductControler();

export default productController;
