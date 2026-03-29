

//D:\avoire-website\app\models\Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
     userId: { type: String, default: "guest" },
     items: [
          {
               productId: { type: String, required: true },
               name: String,
               price: Number,
               qty: Number,
          }
     ],
     total: { type: Number, required: true },
     shippingAddress: {
          name: String,
          email: String,
          phone: String,
          address: String,
          city: String,
          postalCode: String,
          country: String,
     },
     paymentMethod: { type: String, enum: ["cod", "bank_transfer"], required: true },
     paymentScreenshot: { type: String, default: "" },
     paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
     orderStatus: { type: String, enum: ["pending", "processing", "shipped", "delivered"], default: "pending" },
     createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);