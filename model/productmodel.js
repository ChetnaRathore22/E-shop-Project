import pool from "../db/dbconfig.js";
export default class product{
    constructor(id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,imageArray){
             this.id=id;
             this.title=title;
             this.description = description;
             this.price = price;
             this.discountPercentage = discountPercentage;
             this.rating = rating;
             this.stock = stock;
             this.brand = brand;
             this.category = category;
             this.thumbnail = thumbnail;
             this.imageArray = imageArray;
        }

       static getProductList(){
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,con)=>{
                    if(!err){
                        let sql ="select*from product";
                        con.query(sql,(err,result)=>{
                            err?reject(err):resolve(result);
                            con.release();
                        })

                    }else{
                        reject(err);
                    }
                })
            })

        }

            static isFindProduct(id){
              return new Promise((resolve, reject) => {
                pool.getConnection((err, con) => {
                    if (!err) {
                        let sql = "select * from product where id = ?";
                        con.query(sql, [id], (err, result) => {
                            err ? reject(err):resolve(result);
                            con.release();
                        })
                    }
                    else
                        return reject(err);
                 })
            });
        }



        static showproductByCategory(category){
            return new Promise((resolve,reject)=>{
              pool.getConnection((err,con)=>{
                if(!err){
                  let sql ="select*from product where category= ?";
                  con.query(sql,[category],(err,result)=>{
                    err?reject(err):resolve(result);
                    con.release();
                  })
                }else{
                  reject(err);
                }
              })
            })
          }


         static searchByKey(key){
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,con)=>{
                    if(!err){
                      let sql ="select*from product where title like ? or description like ?";
                      con.query(sql,['%'+key+'%','%'+key+'%'],(err,result)=>{
                        con.release();
                        err?reject(err):resolve(result);
                      })
                    }else 
                    reject(err);
                })
            })
         }


}