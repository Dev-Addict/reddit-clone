const path = require('path');

const WelcomeEmail = url => `
    <div style="background-color: #2f3640; color: #f5f6fa; text-align: center; padding: 20px;">
        <div style="border: 2px solid #7f8fa6; background-color: #353b48; border-radius: 10px; position: relative; left: 50%; transform: translateX(-50%); padding: 10px; margin: 10px;">
            <div style="font-size: 26px;">Welcome to reddit family!</div>
            <div style="font-size: 20px;">We have a lot to share with you.</div>
        </div>
        <div style="padding: 10px; margin: 10px;">
            <div>
                Please verify your email to access more features in the reddit.
            </div>
            <a style="border: none; background-color: #0097e6; border-radius: 5px; font-size: 30px; color: #353b48" href=${url}>
                Verify Email
            </a>
        </div>
    </div>
`;

module.exports = WelcomeEmail;