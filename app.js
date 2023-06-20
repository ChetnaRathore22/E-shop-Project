import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import session from "express-session";

import IndexRoute  from './routes/index.route.js';
import CartRoute from './routes/cart.route.js';
import orderRoute from './routes/order.route.js';
import categoryRoute from "./routes/category.route.js";
import productRoute from "./routes/product.route.js";
import ReviewRoute from "./routes/review.route.js";
import WishRoute  from "./routes/wishlist.route.js";
const app=express();

app.set("view engine","ejs");
const __dirname=path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,"public")));
app.use(session({secret:"asdfghjklkjhgfd",saveUninitialized:"true", resave:true}))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/",IndexRoute);
app.use("/cart",CartRoute);
app.use("/order",orderRoute);
app.use("/product",productRoute)
app.use("/category",categoryRoute);
app.use("/review",ReviewRoute)
app.use("/wishlist",WishRoute)

app.listen(3005,(err)=>{
 console.log("Server Started");
})
