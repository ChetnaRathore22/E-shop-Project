import nodemailer from "nodemailer";
let transporter =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"rathorechetna03@gmail.com",
        pass:"",
    },
    tls:{
        rejectUnauthorized:false,
    },
    });

    let mailOption ={
        from :"rathorechetna03@gmail.com",
        to:"",
        subject:"Testing",
        text:"First Email Send from Node Js"
    };

    transporter.sendMail(mailOption,function(err,success){
        if(err){
          console.log(err);  
        }else{
            console.log("Email Sent Succesfully");
        }
    })

