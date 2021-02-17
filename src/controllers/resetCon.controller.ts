import { Request, Response } from 'express'
import { encodeSession } from "../jwt-simple/webToken";
import { connect } from '../database'
import bcrypt from "bcryptjs";
import jwt from "jwt-simple";
var nodemailer = require("nodemailer");
var secret = 'm&ma111f3pp5394b64d91232';


export async function forgotPassword(req: Request, res: Response): Promise<any> {
   var email = req.body.email;
	if (email) {
      try {
         const conn = await connect();
         const results: any = await conn.query('SELECT * FROM usuario WHERE correo_electronico = ?', email);
         if(results[0].length > 0){
            const now = Date.now();     
            // En cuanto expira el link
            const oneHourInMs = 30 * 60 * 1000;
            const expires = now + oneHourInMs;
            let token = results[0][0].email + "separarT"+ expires;
            let secretToken = await jwt.encode(token, secret);

            return res.status(200).json({token:secretToken});    
         } else {
            return res.json('No existe el email');
         }
      }
      catch (e) {
            console.log(e)
      }
	} else {
		return res.json('Ingresa el email');
	}
   
}

export async function changePassword(req: Request, res: Response): Promise<any> {
    var contrasena = req.body.contrasena;
    var token= req.params.token;
    console.log(contrasena);
     if (contrasena) {
       try {
          contrasena= await encrypt(contrasena);
          const now = Date.now();  
          const conn = await connect();
          var decoded = jwt.decode(token, secret);
          console.log(decoded);
          let obtained= decoded.split("separarT"); 
          console.log(obtained[1]);
          console.log(now);
          if(obtained[1]>now){
            const results: any = await conn.query('SELECT * FROM usuario WHERE correo_electronico = ?', obtained[0]);
            if(results[0].length > 0){
                const resultsUpdate: any = await conn.query('UPDATE usuario set contrasena = ? WHERE correo_electronico = ?', [contrasena, obtained[0]]);
                return res.json({
                    message: resultsUpdate
                });
            } else {
                return res.json('No autorizado');
            }

          }else{
            return res.json('Tiempo expirado');
          }
       }
       catch (e) {
             console.log(e)
       }
     } else {
         return res.json('Ingresa nueva contrasena');
     }
    
 }


 export async function sendMail(req: Request, res: Response): Promise<any> {
  console.log(req.body);
  var email = req.body.email;
  var link = req.body.link;
  var texto = "Si desea cambiar la contraseña de su cuenta haga click en el siguiente link: \ " + 
              " " + link;
  var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      post: 465,
      secure:false,
      auth: {
          user:"aisonotificacion@gmail.com",
          pass:"wgzwtywtuwdnnnhs",

      }
  });
  var mailOptions = {
      from: "Remitente",
      to: email,
      subject: "Recuperar contraseña",
      text: texto
  }

  transporter.sendMail(mailOptions, (error: { message: any; }, info: any) => {
      if(error){
          res.status(500).send(error.message);
      }else{
          console.log("Email enviado");
          res.status(200).jsonp(req.body);
      }
  })
    

 }

async function encrypt(token: string): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(token, salt);
}
 
