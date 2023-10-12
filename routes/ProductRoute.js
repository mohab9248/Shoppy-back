import express from "express"
import upload from "../middleware/index.js"
import ProductController from "../controller/ProductController.js"


const router = express()


router.post("/addProduct", upload.uploadImage ,ProductController.addProduct)
router.get("/product" , ProductController.getAllProduct)
router.get("/product/:id" , ProductController.getProductById)
router.put("/updateProduct/:id",upload.uploadImage , ProductController.updateProduct)
router.delete("/deleteProduct/:id" , ProductController.deleteProduct)


export default router