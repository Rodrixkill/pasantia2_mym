import { Request, Response } from 'express'
import { encodeSession } from "../jwt-simple/webToken";
import { connect } from '../database'
import bcrypt from "bcryptjs";
const SECRET_KEY_HERE="m&m-enterprise";

export async function indexWelcome(req: Request, res: Response): Promise<any> {
   var username = req.body.username;
   var password = req.body.password;
	if (username && password) {
      try {
         const conn = await connect();
         const results: any = await conn.query('SELECT * FROM accounts WHERE username = ?', username);
         if(results[0].length > 0){
            const validatePass= await validate(password,results[0][0].password);
            console.log(validatePass);
            if(validatePass){
               const session = encodeSession(SECRET_KEY_HERE, {
                  id: 2,
                  username: username      
               });
               return res.status(201).json(session);
            }
            else{
               return res.json(results[0][1]);
            }     
         } else {
            return res.json('Incorrect password');
         }
      }
      catch (e) {
            console.log(e)
      }
	} else {
		return res.json('Complete username and password');
	}
   
}

async function encrypt(pass: string): Promise<string>{
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(pass, salt);
}

async function validate(pass: string,sql: string): Promise<boolean> {
   console.log(pass);
   console.log(sql);
   return await bcrypt.compare(pass, sql);
 };