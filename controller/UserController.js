import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

class UserController {
    async addUser(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const data = { ...req.body, password: hashedPassword };
            const newUser = new UserModel(data);
            const user = await newUser.save();
            res.status(200).json({message:"Register Successfully" ,  user});
        } catch (err) {
            res.status(500).json({
                error: "An error occurred while creating the user.",
            });
            console.log(err)
        }
    }
}

const userController = new UserController();

export default userController;
