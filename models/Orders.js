import { model, Schema } from "mongoose";

const orderItems = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    total: {
        type: Number,
    },
    product_id: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = model("Order", orderItems);


export default Order;
