/* eslint no-console: 0 */

'use strict';

const nodemailer = require('nodemailer');
const config     = require('./config');

let transporter = nodemailer.createTransport({
    service: 'Gmail', //use well known service
    auth: {
        user: config.mailUser,
        pass: config.mailPass
    }
});



let message = {
    from: 'ferrans <ferrans.chen@gmail.com>',
    to: 'ferrans.chen@gmail.com',
    subject: 'Hello world',
    text: 'Hello world, I am a test mail!',
    html: '<b>Hello world, I am a test mail!</b><a href="https://www.google.com">123</a>',
    attachments: [
            // String attachment
            {
                filename: 'notes.txt',
                content: 'Some notes about this e-mail',
                contentType: 'text/plain' // optional, would be detected from the filename
            },

            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: new Buffer(
                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                        '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                        'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                    'base64'
                ),

                cid: 'note@example.com' // should be as unique as possible
            },

        ]
};
transporter.sendMail(message, (error, info) => {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return process.exit(1);
    }

    console.log('Message sent successfully!');
    // only needed when using pooled connections
    transporter.close();
});
