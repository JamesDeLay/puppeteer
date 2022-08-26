const nodemailer = require('nodemailer');
require('dotenv').config();
 
class EmailService {
    constructor({config}) {
        this.config = config
    }
    async sendEmail(email) {
        console.log('>> Preparing to send email')
        const transporter = await nodemailer.createTransport({...this.config});
        let connected;
        try {
            connected = await transporter.verify()
            console.log(`>> Connected: ${connected}`)
        } catch(err) {
            connected = false
            console.log(err)
        }

        if (connected) {
            console.log('>> Sending email...')
            transporter.sendMail(email, function(err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log(data)
                    console.log("Email sent successfully");
                }
            });
        }
    }
}

module.exports = new EmailService({
    config: {
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD
        }
    } 
})