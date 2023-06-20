import Product from "../model/productmodel.js";
import category from "../model/categorymodel.js";
import Review from "../model/review.model.js";
import User from "../model/usermodel.js";
import Cart from '../model/cartmodel.js';
import user from "../model/usermodel.js";
import session from "express-session";
export const indexPage=(request,response,next)=>{
   Promise.all([Product.getProductList(),category.getCategoryList()])
    .then(result=>{
        response.render("index.ejs",{productList:result[0],categoryList:result[1],currentUser:request.session.user,cartItem:result.length,wishList:result});
    }).catch((err)=>{console.log(err); })
}

export const signInPage =(request,response,next)=>{
    response.render("signIn.ejs",{message:"",})
}

export const signUppage=(request,response,next)=>{
      response.render("signup.ejs",{message:""});
}
export const signup=(request,response,next)=>{
     let{username,email,password,contact}=request.body;
     let user=new User(null,email,username,password,contact);
      user.save()
    .then(result=>{
        return response.render("signIn.ejs",{message:"Registration Succesfully",currentUser:request.session.user});
    }).catch(err=>{
        console.log(err);
    })
}

export const signIn=(request,response,next)=>{
    let user=new User();
    console.log(request.body)
    let{email,password}=request.body;
    user.email=email;
    user.password=password;
    user.confirmPassword;

    user.signin()
    .then(result=>{
       if(result.length){
        request.session.user={id:result[0].id,email:result[0].email,username:result[0].username,message:""};
        return response.redirect("/");
       }else{
        return response.render("signIn.ejs",{message:"Invalid Email or password",currentUser:request.session.user});
       }
    }).catch(err=>{
  })
}

export const signout =(request,response,next)=>{
    request.session.user=null;
    request.session.destroy()
    return response.redirect("/");
}

export const viewMore =(request,response,next)=>{
    let id=request.params.id;
    
    Promise.all([Product.isFindProduct(id),Review.getReview(id)])
    .then(result=>{
       return response.render("viewdescription.ejs",{product:result[0],Review:result[1],currentUser:request.session.user,cartItem:result.length});
    }).catch((err)=>{console.log(err); })
    
}




