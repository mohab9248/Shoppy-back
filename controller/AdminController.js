import AdminModel from "../models/Admin.js";
import bcrypt from "bcrypt";

class AdminController {
    async addAdmin(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const data = { ...req.body, password: hashedPassword };
            const newAdmin = new AdminModel(data);
            const admin = await newAdmin.save();
            res.status(200).json({ message: "Register Successfully", admin });
        } catch (err) {
            res.status(500).json({
                error: "An error occurred while creating the user.",
            });
            console.log(err);
        }
    }

    async getAdminById(req, res) {
        const { id } = req.params;
        try {
            const admin = await AdminModel.findById(id);
            if (!admin) {
                res.send({ message: "user not found" });
            } else {
                res.status(200).json(admin);
            }
        } catch (err) {
            res.send(err);
        }
    }

    async getAllAdmin(req, res) {
        try {
            const admin = await AdminModel.find({});
            if (!admin) {
                res.send({ message: " no user exist !!" });
            } else {
                res.status(200).json(admin);
            }
        } catch (err) {
            res.send(err);
        }
    }

    async updateAdmin(req, res) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = { ...req.body, password: hashedPassword };
        const { id } = req.params;
        try {
            const adminUpdate = await AdminModel.findByIdAndUpdate(id,data)
            res.status(200).json(adminUpdate);
        } catch (err) {
            res.send(err);
        }
    }

    async deleteAdmin(req,res){
        const {id} = req.params
        try{
            const deletAdmin =await AdminModel.findByIdAndDelete(id)
            res.status(200).json(deletAdmin)
        }catch (err) {
            res.send(err);
        }
    }
}

const adminController = new AdminController();

export default adminController;
