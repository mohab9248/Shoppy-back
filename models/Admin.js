import { model, Schema } from "mongoose";

const adminSchema = new Schema({
    userName: {
        type: String,
    },    
    password: {
        type: String,
    },
});

const Admin = model("Admin", adminSchema);

export default Admin;
