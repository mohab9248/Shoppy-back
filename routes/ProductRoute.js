import express from "express"
import upload from "../middleware/index.js"
import ProductController from "../controller/ProductController.js"


const router = express()


router.post("/addProduct", upload.uploadImage ,ProductController.addProduct)
router.get("/product" , ProductController.getAllProduct)
router.get("/firstThreeProduct" , ProductController.getfirstProducts)
router.get("/productByCategories/:id" , ProductController.getAllProductByCategories)
router.get("/product/:id" , ProductController.getProductById)
router.get("/search" , ProductController.searchProduct)
router.put("/updateProduct/:id",upload.uploadImage , ProductController.updateProduct)
router.delete("/deleteProduct/:id" , ProductController.deleteProduct)


export default router