

import Cart from "../model/cartmodel.js";


export const addToCart = (request, response, next) => {
   let userId = request.params.userId * 1 - 1240;
   let productId = request.params.productId * 1 - 2342;

   let cart = new Cart();
   cart.userId = userId;
   cart.productId = productId;

   cart.ProductExist().then(result => {
      // console.log(result);
      if (!result.length) {
         cart.save().then(result => {
            return response.json({ message: "product add in Cart Succesfully" });
         }).catch(err => {
            console.log(err);
         })
      } else {
         return response.json({ message: "Product is Already is Present in your Cart" });
      }
   }).catch(err => { });
}

export const viewCart = (request, response, next) => {
   let userId = request.session.user.id;
   Cart.viewCart(userId).then(result => {
      if (result.length) {
         return response.render("addtocart.ejs", { cartItem: JSON.parse(JSON.stringify(result)), currentUser: request.session.user });
      } else {
         return response.render("emptycart.ejs", { currentUser: "request.session.user", cartItem: JSON.parse(JSON.stringify(result)) });
      }
   }).catch(err => {
      console.log(err);
   });
}

export const CartLoad = (request, response, next) => {
   let userId = request.session.user.id;
   Cart.viewCart(userId).then(result => {
      return response.status(200).json(result);
   }).catch(err => {
      console.log(err);
   });
}

export const removeCart = (request, response, next) => {
   let productId = request.params.id;
   let userId = request.session.user.id;
  
      Cart.deleteCart(productId,userId).then(result => {
         return response.redirect("/cart/viewCart")
      }).catch(err => {

      });
   
}




