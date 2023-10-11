import express from "express"

import ProductController from "../controller/ProductController.js"


const router = express()


router.post("/addProduct", ProductController.addProduct)
router.get("/product" , ProductController.getAllProduct)
router.get("/product/:id" , ProductController.getProductById)
router.put("/updateProduct/:id" , ProductController.updateProduct)
router.delete("/deleteProduct/:id" , ProductController.deleteProduct)


export default router