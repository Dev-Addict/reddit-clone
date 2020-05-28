const nodeMailer = require('nodemailer');
const htmlToText = require('html-to-text');

class Email {
    constructor(user, url) {
        this.to = user.email;
        this.username = user.username;
        this.url = url;
        this.from = `reddit <${process.env.EMAIL_FROM}>`;
    }

    createTransport() {
        return nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_FORM_PASSWORD
            }
        })
    }

    async send(template, subject) {
        const htmlTemplate = template;

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html: htmlTemplate,
            text: htmlToText.fromString(htmlTemplate)
        };

        await this.createTransport().sendMail(mailOptions);
    }
}

module.exports = Email;