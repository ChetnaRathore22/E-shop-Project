import pool from "../db/dbconfig.js";

export default class WishList{
    constructor(id,userId,productId,status){
       this.id=id;
       this.userId=userId;
       this.productId=productId;
       this.status=status;
    }

     static exist(userId,productId){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select*from wishlist where userId=? and productId =? ";
                    con.query(sql, [userId,productId], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                } else {
                    reject(err);
                }
            })
        })
    }
     
    
    static saveWishlist(productId,userId,status) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into wishlist(userId,productId,status)values(?,?,?)";
                    con.query(sql, [userId,productId,status], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                } else {
                    reject(err);
                }
            })
        })
    }


    static viewWishList(userId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  let sql=" select*,product.id,product.price,product.title,product.discountPercentage,product.brand,product.thumbnail from product inner join wishlist on product.id =wishlist.productId where wishlist.userId = ?";
                  con.query(sql,[userId],(err,result)=>{
                   err?reject(err):resolve(result);
                   con.release();
                  })
                }else{
                    reject(err);
                }
            })
        })
    }

    static findOne(userId) {

        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from wishlist where userId=?";
                    con.query(sql, [userId], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })

                } else {
                    reject(err);
                }
            })
        })
    }


static deleteLike(id,status) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (!err) {
                let sql = "delete from wishlist where id=? and status=?";
                con.query(sql, [id,status], (err, result) => {
                    err ? reject(err) : resolve(result);
                    con.release();
                })

            } else {
                reject(err);
            }
        })
  })
}
}
