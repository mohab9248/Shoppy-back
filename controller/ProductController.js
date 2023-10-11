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
    
    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
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

    async updateProduct(req,res){
        const {id} = req.params
        const data = req.body
        try{
            const updateProduct = await Product.findByIdAndUpdate(id,data)
            res.status(200).json(updateProduct)
        }catch (err) {
            res.send(err);
        }
    }

    async deleteProduct(req,res){
        const {id} = req.params
        try{
            const product =await Product.findByIdAndDelete(id)
            res.status(200).json(product)
        }catch (err) {
            res.send(err);
        }
    }

}

const productController = new ProductControler();

export default productController;
