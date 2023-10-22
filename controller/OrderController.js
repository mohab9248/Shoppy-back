import Order from "../models/Orders.js";

class orderController {
    addorder(req, res) {
        const { body } = req;
        const order = new Order(body);
        order
            .save()
            .then((data) => {
                res.json({ data, message: "order created" });
            })
            .catch((error) => {
                res.send(error);
            });
    }

    async getOrderByIDOfUser(req, res) {
        const { id } = req.params;
        const findOrder = await Order.find({user_id:id})
            .populate("user_id")
            .populate("product_id");
        try {
            if (!findOrder) {
                res.send({ message: " not order find " });
            } else {
                res.status(200).json(findOrder);
            }
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    }

    async getOrderByID(req, res) {
        const { id } = req.params;
        const findOrder = await Order.findById(id)
            .populate("user_id")
            .populate("product_id");
        try {
            if (!findOrder) {
                res.send({ message: " not order find " });
            } else {
                res.status(200).json(findOrder);
            }
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    }

    async getAllOrder(req, res) {
        Order.find()
            .populate("user_id")
            .populate("product_id")
            .then((data) => {
                if (!data || data.length === 0) {
                    return res.send("No orders yet");
                }
                res.json(data);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }

    async updateOrder(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedOrder = await Order.findByIdAndUpdate(id, data);
            res.status(200).json(updatedOrder);
        } catch (err) {
            res.send(err);
        }
    }

    async deleteOrder(req, res) {
        const { id } = req.params;
        try {
            const deleteData = await Order.findByIdAndDelete(id);
            res.status(200).json(deleteData);
        } catch (err) {
            res.send(err);
        }
    }
}

const Ordercontroller = new orderController();

export default Ordercontroller;
