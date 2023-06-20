import Product from "../model/productmodel.js";
import Category from"../model/categorymodel.js";
import { request, response } from "express";


export const showCategoryByProduct=(request,response,next)=>{
    let category = (request.params.categoryName);
    Promise.all([Product.showproductByCategory(category),Category.getCategoryList()])
    .then(result=>{
        response.render("allproduct.ejs",{productList:result[0],categoryList:result[1],currentUser:request.session.user,cartItem:result.length});
    }).catch((err)=>{console.log(err); })

    
    
}

export const products=(request,response,next)=>{
    Promise.all([Product.getProductList(),Category.getCategoryList()])
    .then(result=>{
        response.render("allproduct.ejs",{productList:result[0],categoryList:result[1],currentUser:request.session.user,cartItem:result.length});
    }).catch(err=>{console.log(err)})
}

export const searchProduct=(request,response,next)=>{
    let key=request.params.key;
    Product.searchByKey(key).then(result=>{
      return response.status(200).json({productList:result})
    }
        ).catch(err=>{console.log(err)})
}

