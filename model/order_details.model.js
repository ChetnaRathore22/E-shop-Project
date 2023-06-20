import pool from "../db/dbconfig.js";
export default class OrderDetails{
    constructor(id,userId,date,billAmount,contactPerson,contactNumber, delieveryAddress,status,paymentMode){
         this.id=id;
         this.userId=userId;
         this.date=date;
         this.billAmount=billAmount;
         this.contactPerson=contactPerson;
         this.contactNumber=contactNumber;
         this.delieveryAddress=delieveryAddress;
         this.status=status;
         this.paymentMode=paymentMode;
    }


    save(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "insert into order_details(userId,date,billAmount,contactPerson,contactNumber, delieveryAddress,status,paymentMode,id)values(?,?,?,?,?,?,?,?,?)";
                    con.query(sql,[this.userId,this.date,this.billAmount,this.contactPerson,this.contactNumber,this. delieveryAddress,this.status,this.paymentMode,this.id],(err,result)=>{
                        err?reject(err):resolve(result);
                    });
                    con.release();
                }
            })
        })
    }

   static viewOrderDetail(orderId){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
                let sql = "select * from product inner join order_items on product.id=order_items.productId inner join order_details on order_items.orderDetailsId = order_details.id where order_details.id =? order by order_details.id desc";
                con.query(sql,[orderId],(err,result)=>{
                    err?reject(err):resolve(result);
                });
                con.release();
            }
        })
    })
   }


   static viewHistory(userId){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
                let sql = "select * from order_details where UserId=?";
                con.query(sql,[userId],(err,result)=>{
                    err?reject(err):resolve(result);
                });
                con.release();
            }
        })
    })
   }
}