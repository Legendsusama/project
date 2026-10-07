import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// placing orders using CoD method

const placeOrder = async (req, res)=>{

    try {

        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId, items, amount,  paymentMethod: "COD",
            payment: false,
            address,
            date: Date.now()
        }
        

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData:{}})


        res.json({success: true, message: "Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }

}




// Placing orders using Razor Method
const placeOrderStripe = async (req, res)=>{



} 


// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res)=>{

}

// All Orders data for admin panels
const allOrders = async(req, res)=>{

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true, orders})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }

}




// User order Data for frontend
const userOrders = async (req, res)=>{

    try {

        const {userId} = req.body;
        console.log("The requesting body is this", userId)

        const orders = await orderModel.find({userId})

        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}


// update order status
const updateStatus = async (req, res)=>{
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message: "Status Updated"})


    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


export {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus}