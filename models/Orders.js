import { model, Schema } from "mongoose";

const orderItems = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  address: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
  },
  isStatus: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model("Order", orderItems);

export default Order;
