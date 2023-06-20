import pool from "../db/dbconfig.js";
export default class orderItems{
    constructor(id,productId,qty,orderDetailsId){
        this.id=id;
        this.productId=productId;
        this.qty=qty;
        this.orderDetailsId=orderDetailsId;
    }

    static orderItemSave(cartItem,orderId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  let sql ="insert into order_items(productId,qty,orderDetailsId)values(?,?,?)";
                  cartItem.forEach(item => {
                    con.query(sql,[item.id,item.qty,orderId],(err,result)=>{
                        con.release();
                        err?reject(err):resolve(result);
                    })
                  });

                }else{
                    reject(err);
                }
            })
        })

    }

static viewMyOrder(userId){
     return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
              let sql ="select *,order_items.productId , product.title  from order_details inner join order_items on order_details.id=order_items.orderDetailsId  inner join product where order_items.productId=product.id;";
              cartItem.forEach(item => {
                con.query(sql,[item.id,item.qty,orderId],(err,result)=>{
                    con.release();
                    err?reject(err):resolve(result);
                })
              });

            }else{
                reject(err);
            }
        })

     })
}

}
