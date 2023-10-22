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
        const { searchQuery } = req.query; // Assuming the search query is sent as a query parameter

        try {
            if (!searchQuery) {
                return res
                    .status(400)
                    .json({ message: "Search query is required." });
            }

            const products = await Product.find({
                // Use a regular expression to perform a case-insensitive search
                $or: [
                    { name: { $regex: new RegExp(searchQuery, "i") } },
                    { description: { $regex: new RegExp(searchQuery, "i") } },
                    // Add more fields here if needed
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
        const categoryName = req.params.id; // Assuming categoryName is passed in the request params

        try {
            // First, find the category by name
            const category = await Category.findOne({ name: categoryName });

            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            // Once you have the category, find products that belong to that category
            const products = await Product.find({
                category_id: category._id, // Assuming category_id is the reference to the category
            }).populate("category_id");

            if (!products || products.length === 0) {
                return res
                    .status(201)
                    .json({ message: "No products in this category" });
            }

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({
                message: "Internal server error",
                error: err,
            });
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
