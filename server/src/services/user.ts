import {v4 as uuid} from 'uuid'
import sqlite3 from "sqlite3";
import { db_path } from '../server';

export function getdatabase(){
    
 return  new sqlite3.Database(db_path,sqlite3.OPEN_READWRITE,(error)=>{
    if (error){
        console.error("Error opening database")
    }
  })
}


/**
 * 
 * @param data 
 * @returns 
 */
const createUser = async(data)=>{
    const db = getdatabase()
    return new Promise((resolve, reject) => {
          db.all<IUser>("SELECT  id,username,email FROM users WHERE email = ?", [data.email], (err, rows) => {

            if (err) {
                db.close();
                err.statusCode = 500;
                return reject(err);
            }

            if (rows.length === 0){
                data.id = uuid();
                return db.run('INSERT INTO users(id,username,email,password) VALUES(?,?,?,?)',
                    [data.id,data.username,data.email,data.password],
                    function(n_err) {
                        db.close()
                        if (n_err) {
                          n_err.statusCode = 500;
                            return reject(n_err)
                        }
                        return resolve(null)
                    }
                );
            }
            else{
                let error = new Error("User is already registered with this email");
                error.statusCode = 400;
                return reject(error)
            }

          });
    });
    
}






/**
 *
 * @param email 
 * @param password 
 * @returns 
 */
const login = async (email,password)=>{
    const db = getdatabase()
    return new Promise((resolve, reject) => {
          db.all<IUser>("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
            db.close();
            if (err) {
              const error = new Error("Internal server error");
              error.statusCode = 500;
              return reject(error);
            }
      
            if (rows.length === 0 || rows[0].password !== password) {
              const error = new Error("Incorrect credentials");
              error.statusCode = 400;
              return reject(error);
            }
            delete rows[0].password
            resolve(rows[0]);
          });
        });
}

/**
 *
 * @param id
 * @returns 
 */
const getById = async (id)=>{
    const db = getdatabase()
    return new Promise((resolve, reject) => {
          db.all<IUser>("SELECT id,username,email FROM users WHERE id = ?", [id], (err, rows) => {
            db.close();
            if (err) {
                err.statusCode = 500;
              return reject(err);
            }
            if (rows.length === 0) {
              console.log(rows)
              let error = new Error("User Not found");
              error.statusCode = 404;
              return reject(error);
            }

            const user:any = rows[0];      
            return resolve(user);
          });
        });
      }


export default{
    createUser,
    getById,
    login
}
