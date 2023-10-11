import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

class UserController {
    async addUser(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const data = { ...req.body, password: hashedPassword };
            const newUser = new UserModel(data);
            const user = await newUser.save();
            res.status(200).json({ message: "Register Successfully", user });
        } catch (err) {
            res.status(500).json({
                error: "An error occurred while creating the user.",
            });
            console.log(err);
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                res.send({ message: "user not found" });
            } else {
                res.status(200).json(user);
            }
        } catch (err) {
            res.send(err);
        }
    }

    async getAllUsers(req, res) {
        try {
            const user = await UserModel.find({});
            if (!user) {
                res.send({ message: " no user exist !!" });
            } else {
                res.status(200).json(user);
            }
        } catch (err) {
            res.send(err);
        }
    }

    async updateUser(req, res) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = { ...req.body, password: hashedPassword };
        const { id } = req.params;
        try {
            const userUpdate = await UserModel.findByIdAndUpdate(id,data)
            res.status(200).json(userUpdate);
        } catch (err) {
            res.send(err);
        }
    }

    async deleteUser(req,res){
        const {id} = req.params
        try{
            const deletUser =await UserModel.findByIdAndDelete(id)
            res.status(200).json(deletUser)
        }catch (err) {
            res.send(err);
        }
    }
}

const userController = new UserController();

export default userController;
