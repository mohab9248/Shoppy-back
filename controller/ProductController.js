import Product from "../models/Product.js";

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
}

const productController = new ProductControler();

export default productController;
