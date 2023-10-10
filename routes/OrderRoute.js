import orderController from "../controller/OrderController.js";
import express from "express"

const router = express.Router()

router.post('/addOrder' , orderController.addorder)
router.get('/getAllOrder' , orderController.getAllOrder)


export default router