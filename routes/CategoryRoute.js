import categoryController from "../controller/CategoryController.js"
import express from "express"
import  upload  from "../middleware/index.js"

const router = express.Router()

router.post('/addCategory' ,  upload.uploadImage , categoryController.addCategory   )
router.get('/getAllCategory' , categoryController.getAllCategory)
router.get('/getCategoryById/:id' , categoryController.getCategoryById)
router.put('/updateCategory/:id',upload.uploadImage , categoryController.updateCategory)
router.delete('/deleteCategory/:id' , categoryController.deleteCategory)


export default router