import { request, response } from "express";
import OrderDetails from "../model/order_details.model.js";
import orderItems from "../model/order_items.model.js";
import Cart from "../model/cartmodel.js";



export const orderSave = (request, response, next) => {
    let cartItem = JSON.parse(request.body.cartItem);
    let totalBillAmount = cartItem.reduce((previous, current) => {
        return previous + current.price * current.qty;
    }, 0);


    const { contactPerson, contactNumber, deliveryAddress } = request.body;
    let date = new Date().toString().substring(4, 15).replaceAll(' ', '-');

    let userId = request.session.user.id;
    let orderId = Date.now();

    let order = new OrderDetails(orderId, userId, date, totalBillAmount, contactPerson, contactNumber, deliveryAddress, "Recieved", "COD");
    order.save().then(result => {
        orderItems.orderItemSave(cartItem, orderId).then(result => {
            Cart.clearCart(userId).then(result => {
                return response.redirect("/");
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    });
}


export const orderHistory =(request,response,next)=>{
    let userId =request.session.user.id;
    OrderDetails.viewHistory(userId)
    .then(result=>{
        return response.render("order.ejs",{orderData:result,currentUser: request.session.user,cartItem:result.length,message:" "})
    })
        .catch(err=>{console.log})
}

export const myOrder = (request, response, next) => {
    let orderId=request.params.id;
    let userId=request.session.user;
   OrderDetails.viewOrderDetail(orderId).then( result=>{
         return response.render("orderHistory.ejs",{orderData:result,currentUser: request.session.user,cartItem:result.length,message:" " });
    }
   ).catch(err=>{
    console.log(err);
   })
}


