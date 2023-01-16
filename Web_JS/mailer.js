let nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'email',
        pass: 'appPassword',
    },
});

let mailOptions = {
    from: 'email',
    to: '',
    subject: 'Test',
    text: ''
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
