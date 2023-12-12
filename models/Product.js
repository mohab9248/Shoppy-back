import { model, Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = model("Product", productSchema);

export default Product;
