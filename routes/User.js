import express from "express"

import UserController from "../controller/UserController.js"

const router = express()


router.post("/register", UserController.addUser)
router.get("/user/:id", UserController.getUserById)
router.get("/user", UserController.getAllUsers)
router.put("/userUpdate/:id", UserController.updateUser)
router.delete("/deleteUser/:id", UserController.deleteUser)


export default router