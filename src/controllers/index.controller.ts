import { Request, Response } from 'express'
import { encodeSession } from "../jwt-simple/webToken";
const SECRET_KEY_HERE="m&m-enterprise";

export function indexWelcome(req: Request, res: Response): Response {
   let userId = req.body.id;
   let userName = req.body.username;
   let pass= req.body.password;
   if(pass =="pass"){
      const session = encodeSession(SECRET_KEY_HERE, {
         id: userId,
         username: userName      
      });
      return res.status(201).json(session);;
   }else{
      return res.json('Welcome to the Api');
   }
}