import { request, response } from 'express';
import Wishlist from '../model/wishlist.model.js';
export const wishlistProduct = (request, response, next) => {
    let userId = request.session.user.id;
    let productId = request.params.pid;
    let status = request.params.status;
    Wishlist.exist(userId, productId)
        .then(result => {
            if (!result.length) {
                console.log(result);
                Wishlist.saveWishlist(productId, userId, status)
                    .then(result => {
                        return response.json({wishList:result, message: "product Added in your Wishlist" });
                    }).catch(err => {
                        console.log(err)
                    });
            } else {
                return response.json({ message: "product Already Added in your Wishlist" })
            }

        }).catch(err => { console.log(err) });
        
}

export const viewWishList=(request,response,next)=>{
    let userId=request.session.user.id;
    console.log(userId);
    Wishlist.viewWishList(userId).then(result=>{
       
        return response.render("wishlist.ejs",{wishList:result,currentUser:request.session.user,cartItem:result.length});
    }).catch((err)=>{console.log(err);})
}


export const removeLike = (request, response, next) => {
    let productId = request.params.id;
    let userId = request.session.user.id;
    let status=request.params.status;
    Wishlist.findOne(userId).then(result => {
        let wishList = result;
        let id = (wishList[productId].id);
        Wishlist.deleteLike(id,status).then(result => {
            return response.redirect("/wishlist/view")
        }).catch(err => {

        });
    }).catch(err => {
        console.log(err);
   })
}