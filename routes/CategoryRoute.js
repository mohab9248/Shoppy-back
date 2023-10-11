import categoryController from "../controller/CategoryController.js"
import express from "express"

const router = express.Router()

router.post('/addCategory' , categoryController.addCategory )
router.get('/getAllCategory' , categoryController.getAllCategory)
router.get('/getCategoryById/:id' , categoryController.getCategoryById)
router.put('/updateCategory/:id' , categoryController.updateCategory)
router.delete('/deleteCategory/:id' , categoryController.deleteCategory)


export default router