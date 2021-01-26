import { Request, Response } from 'express'
import { encodeSession } from "../jwt-simple/webToken";
import { connect } from '../database'
const SECRET_KEY_HERE="m&m-enterprise";

export async function indexWelcome(req: Request, res: Response): Promise<any> {
   var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
      try {
         const conn = await connect();
         const results: any = await conn.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password]);
         if(results[0].length > 0){
            const session = encodeSession(SECRET_KEY_HERE, {
               id: 2,
               username: username      
            });
            return res.status(201).json(session);
         } else {
            return res.json('Username and password incorrect');
         }
      }
      catch (e) {
            console.log(e)
      }
	} else {
		return res.json('Complete username and password');
	}
   
}