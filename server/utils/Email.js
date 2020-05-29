const nodeMailer = require('nodemailer');
const htmlToText = require('html-to-text');
const ReactDOMServer = require('react-dom/server');

const WelcomeEmail = require('../templates/email/WelcomeEmail');

class Email {
    constructor(user, url) {
        this.to = user.email;
        this.username = user.username;
        this.url = url;
        this.from = `reddit <${process.env.EMAIL_FROM}>`;
    }

    createTransport = () => {
        return nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_FORM_PASSWORD
            }
        })
    };

    send = async (template, subject) => {

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html: template,
            text: htmlToText.fromString(template)
        };

        await this.createTransport().sendMail(mailOptions);
    };

    sendWelcome = async () => {
        await this.send(ReactDOMServer.renderToStaticMarkup(<WelcomeEmail url={this.url}/>));
    };
}

module.exports = Email;