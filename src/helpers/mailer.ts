import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId }: any) => {
    try {
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000, //1 hour
        })
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000, //1 hour
        })
        }
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,   
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,   
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.FRONTEND_URL}/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY" ? "verify your email" : "reset your password"
            }. This link will expire in 1 hour.</p>`,
        };
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        console.log("Error sending email:", error.message);
        throw new Error(error.message);
    }
}

