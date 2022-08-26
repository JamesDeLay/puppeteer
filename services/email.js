const nodemailer = require('nodemailer');
require('dotenv').config();
 
class EmailService {
    constructor({config}) {
        this.config = config
    }
    async sendEmail(email) {
        console.log('>> Preparing to send email')
        console.log('>>>> Nodemailer Config: ')
        console.log('***')
        console.log(this.config)
        console.log('***')
        
        const transporter = await nodemailer.createTransport({...this.config});
        
        let connected;
        try {
            connected = await transporter.verify()
            console.log(`>> Connected: ${connected}`)
        } catch(err) {
            connected = false
            console.log(`>> Connected: ${connected}`)
            console.log(`>> Connection error:`)
            console.log(`***`)
            console.log(err)
            console.log(`***`)
        }

        if (connected) {
            console.log('>> Sending email...')
            await transporter.sendMail(email, function(err, data) {
                if (err) {
                    console.log(">> Error sending email:");
                    console.log("***");
                    console.log(err);
                    console.log("***");
                } else {
                    console.log(">> Email sent successfully");
                    console.log(">>>> Email Metadata");
                    console.log("***");
                    console.log(data)
                    console.log("***");
                }
            });
        }
    }
}

module.exports = new EmailService({
    config: {
        host: process.env.NODEMAILER_HOST,
        port: Number(process.env.NODEMAILER_PORT),
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD
        }
    } 
})