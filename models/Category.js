import { model, Schema } from "mongoose";

const category = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
});

const Category = model("Category", category);

export default Category;
