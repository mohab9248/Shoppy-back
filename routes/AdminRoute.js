import express from "express"


import adminController from "../controller/AdminController.js"

const router = express()


router.post("/addAdmin", adminController.addAdmin )
router.get("/getAdmin/:id", adminController.getAdminById)
router.get("/getAllAdmin", adminController.getAllAdmin)
router.put("/adminUpdate/:id", adminController.updateAdmin)
router.delete("/deleteAdmin/:id", adminController.deleteAdmin)


export default router