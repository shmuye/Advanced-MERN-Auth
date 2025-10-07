import {MailtrapClient} from 'mailtrap';
import dotenv from 'dotenv'

dotenv.config()



export const mailtrapClient = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN,
    endpoint: process.env.MAILTRAP_ENDPOINT
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Shumye Ayalneh",
};
const recipients = [
    {
        email: "shmuye27@gmail.com",
    }
];

client
    .send({
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        html: "Congrats for sending test email with Mailtrap!",
        category: "Integration Test",
    })
    .then(console.log, console.error);