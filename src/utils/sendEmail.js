import nodeMailer from "nodemailer"

export const sendEmail = async({email, subject, message, type = 'signin'})=>{
    const transporter = nodeMailer.createTransport({
        host : process.env.NEXT_PUBLIC_SMTP_HOST,
        service: process.env.NEXT_PUBLIC_SMTP_SERVICE,
        port : process.env.NEXT_PUBLIC_SMTP_PORT,
        auth : {
            user : type === 'signin' ? process.env.NEXT_PUBLIC_SMTP_MAIL_SIGNIN : process.env.NEXT_PUBLIC_SMTP_MAIL_LOGIN,
            pass : type === 'signin' ? process.env.NEXT_PUBLIC_SMTP_PASSWORD_SIGNIN : process.env.NEXT_PUBLIC_SMTP_PASSWORD_LOGIN
        }
    })

    const options = {
        from : type === 'signin' ? process.env.NEXT_PUBLIC_SMTP_MAIL_SIGNIN : process.env.NEXT_PUBLIC_SMTP_MAIL_LOGIN,
        to : email,
        subject,
        text : message
    }
    await transporter.sendMail(options);
}