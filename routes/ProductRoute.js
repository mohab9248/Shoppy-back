import express from "express"

import ProductController from "../controller/ProductController.js"

const router = express()


router.post("/addProduct", ProductController.addProduct)


export default router