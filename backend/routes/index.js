const express = require("express");
const router = express.Router();


const productRoute = require("./products.js");
const categoryRoute = require("./categories.js");
const userRoute = require("./users.js");
const authRoute = require("./auth.js");
const couponRoute = require("./coupons.js");
const paymentRoute = require("./payment.js");

router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/auth", authRoute);
router.use("/coupons", couponRoute);
router.use("/users", userRoute);
router.use("/payment", paymentRoute);

module.exports = router