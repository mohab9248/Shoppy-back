import express from "express"

import RegisterController from "../controller/UserController.js"

const router = express()


router.post("/register", RegisterController.addUser)


export default router