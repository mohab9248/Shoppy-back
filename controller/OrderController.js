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

    getAllOrder(req ,res) {
        if(!Order){
            res.send("not order yet")
        }
        Order.find().populate('user_id').populate('product_id').then((data)=>{
            res.json(data)
        }).catch((error)=>{
            res.send(error)
        })
    }
}

const Ordercontroller = new orderController();

export default Ordercontroller;
