import express from "express";
import connectDB from "./db/config.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routerRegister from "./routes/User.js";
import userModel from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import ProductRoute from "./routes/ProductRoute.js";
import orderRoute from "./routes/OrderRoute.js";
import categoryRoute from "./routes/CategoryRoute.js"
import cors from "cors"

dotenv.config();

connectDB();
const app = express();
app.listen(process.env.PORT);
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use("/uploads", express.static("./uploads"))
app.use(morgan("tiny"));
app.use(cors());
app.use("/", routerRegister);
app.use("/", ProductRoute);
app.use("/", orderRoute);
app.use("/", categoryRoute);

//Login and authentication
app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send("user not exist ");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("email or password invalide !!");
        }
        const token = jwt.sign({ userId: user._id }, "your-secret-key", {
            expiresIn: "4d",
        });
        res.status(200).json({
            user,
            token,
            message: `Welcome ${user.firstName}`,
        });
    } catch (err) {
        res.send(err);
    }
});

app.get("/", function (req, res) {
    res.send("Hello World");
});
