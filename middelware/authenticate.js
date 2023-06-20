export const verify=(request,response,next)=>{
    console.log("dfghjk");
    if(request.session.user){
        next();
    }else{
        response.render("signIn.ejs",{message:"",currentUser:request.session.user});
    }
}