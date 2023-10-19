import { config } from "dotenv";
import { createTransport } from "nodemailer";
config()
const transporter = createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'mysoace.h@gmail.com', 
      pass: process.env.PASS
    }
  });

  export const Mail = async(email,url)=>{
    const info = await transporter.sendMail({
        from: 'mysoace.h@gmail.com' , // sender address
        to: email, // list of receivers
        subject: "your cridantaial", // Subject line
        text: "your info of youth-fastival", // plain text body
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>varification link</title>
        </head>
        <body>
            <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
                <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h1 style="color: #333;">varification link</h1>
                    <a href="${url}"><span style="font-weight: bold;">varification</span>,</p>
                    
                </div>
            </div>
        </body>
        </html>
        `, // html body
      }).catch((error)=>{console.log(error.message)});
  }