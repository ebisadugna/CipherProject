import mongoose from "mongoose";
import app from "./app";
import  sqlite3 from "sqlite3";
import path from "path";


const port = 3001
export const db_path = path.resolve('src/database.db')

const db = new sqlite3.Database(db_path,sqlite3.OPEN_READWRITE,(error)=>{
  if (error){

      console.error("Error opening database")
      console.log(error.message)
  }
  else{
      db.run(`CREATE TABLE IF NOT EXISTS  users (
          id TEXT PRIMARY KEY,
          username TEXT,
          email TEXT UNIQUE,
          password TEXT
      )`, (err) => {
        if (err) {
          console.error(err.message);
        }else{
          app.listen(port, async () =>  {
            return console.log(
              `Express is listening at http://localhost:${port}`
            );
          });
        }
      });
      db.close()
  }
})