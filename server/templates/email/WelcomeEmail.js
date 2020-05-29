const path = require('path');
const applyStyle = require('../../utils/applyStyle')(path.join(__dirname, '../style/email/WelcomeEmail.css'));

const WelcomeEmail = ({url}) => (
    <div {...applyStyle('.welcome-email-container')}>
        <div {...applyStyle('.welcome-email-header')}>
            <div {...applyStyle('.welcome-email-header-title')}>Welcome to reddit family!</div>
            <div {...applyStyle('.welcome-email-header-subtitle')}>We have a lot to share with you.</div>
        </div>
        <div {...applyStyle('.welcome-email-body')}>
            <div {...applyStyle('.welcome-email-header-verify')}>
                Please verify your email to access more features in the reddit.
            </div>
            <a {...applyStyle('.welcome-email-header-verify-button')} href={url}>Verify Email</a>
        </div>
    </div>
);

module.exports = WelcomeEmail;