const nodemailer = require('nodemailer');
const cron = require('node-cron');

// transporter object with password authenticated smtp mailer
const transporterSMTP = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS 
    }
})

const recipients = ['a@yopmail.com','b@yopmail.com','c@yopmail.com','d@yopmail.com','e@yopmail.com','f@yopmail.com',
'g@yopmail.com','h@yopmail.com','i@yopmail.com','j@yopmail.com','k@yopmail.com','l@yopmail.com','m@yopmail.com',
'n@yopmail.com','o@yopmail.com','p@yopmail.com','q@yopmail.com','r@yopmail.com','s@yopmail.com','t@yopmail.com',
'u@yopmail.com','v@yopmail.com','w@yopmail.com','x@yopmail.com','y@yopmail.com']


// recipients.toString()


function sendEmails(recipients) {
    for (let recipient of recipients) {
        console.log("hi")
        let mailOptions = {
            from: 'youremail@gmail.com',
            to: recipient,
            subject: 'Test email',
            text: 'This is a test email'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}


let chunkSize = 25;
let currentIndex = 0;

cron.schedule('* * * * *', function() {
    let currentChunk = recipients.slice(currentIndex, currentIndex + chunkSize);
    sendEmails(currentChunk);
    currentIndex += chunkSize;
    
    if (currentIndex >= recipients.length) {
        // reset the index when we reach the end of the array
        currentIndex = 0;
    }
});

module.exports = send;
sendEmails()


