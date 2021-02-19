import { Request, Response } from 'express'
import { encodeSession } from "../jwt-simple/webToken";
import { connect } from '../database'
import bcrypt from "bcryptjs";
const SECRET_KEY_HERE="m&m-enterprise";

export async function indexWelcome(req: Request, res: Response): Promise<any> {
   var username = req.body.username;
   var password = req.body.password;
   console.log(username);
   console.log(password);
   const prueba = await encrypt("password");
	if (username && password) {
      try {
         const conn = await connect();
         const results: any = await conn.query('SELECT * FROM usuario WHERE usuario = ?', username);
         console.log(results[0][0]);
         if(results[0].length > 0){
            
            const validatePass= await validate(password,results[0][0].contrasena);
            const ciUser: string=  results[0][0].ci;
            console.log(validatePass);
            if(validatePass){
               const session = encodeSession(SECRET_KEY_HERE, {
                  ci: ciUser,
                  username: username      
               });
               return res.status(201).json([session,results[0][0].permisos,results[0][0].empresa]);
            }
            else{
               return res.json('Contraseña incorrecta');
            }     
         } else {
            return res.json('No existe el usuario');
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