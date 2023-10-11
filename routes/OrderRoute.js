import orderController from "../controller/OrderController.js";
import express from "express"

const router = express.Router()

router.post('/addOrder' , orderController.addorder)
router.get('/getAllOrder' , orderController.getAllOrder)
router.get('/getOrderById/:id' , orderController.getOrderByID)
router.put('/updateOrder/:id' , orderController.updateOrder)
router.delete('/deleteOrder/:id' , orderController.deleteOrder)


export default router