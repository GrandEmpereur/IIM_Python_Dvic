import * as dotenv from "dotenv";
import Koa, {Context} from "koa";
import cors from "@koa/cors";
import api from "./router/api";
import path from "path";
import views from "koa-views";
import { getBin } from "./services/axios";

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === "development" ? '.env.development' : '.env'),
});

async function main(): Promise<void> {
    const app = await createApp();
    const port = process.env.PORT || 4200;

    app.listen(port);
    console.log(`Listening on port http://localhost:${port}`);
}

async function createApp(): Promise<Koa> {
    const app = new Koa();

    app.use(cors());
    app.use(api.routes());

    /* Rendering the index.ejs file with the data from the sensors variable. */
    app.use(views(path.resolve(__dirname, './views'), {
        extension: 'ejs'
    }));

    /* This is a middleware that catches errors and returns a 500 status code with the error message. */
    app.use(async (ctx: Context, next: () => Promise<any>) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err.message;
            ctx.app.emit('error', err, ctx);
        }
    });

    /* Rendering the index.ejs file with the data from the sensors variable. */
    app.use(async (ctx: Context) => {
        try {
            let sensors = await getBin();
            const phone = process.env.TWILIO_TO_PHONE_NUMBER;

            if (sensors.temperature.value > 30) {
                sendSMS( phone, 'The temperature is greater than 30 degrees');
            } else if (sensors.humidity.value < 10) {
                sendSMS( phone, 'The temperature is less than 10 degrees');
            }

            if (sensors.humidity.value < 10) {
                sendSMS( phone, 'The humidity is less than 10%');
            } else if (sensors.humidity.value > 70) {
                sendSMS( phone, 'The humidity is greater than 70%');
            }
            
            await ctx.render('index', {
                title: 'Sensor Dashboard',
                message: 'You can see the sensors data here : ',
                data : {
                    temperature: sensors.temperature,
                    humidity: sensors.humidity,
                    date: sensors.date
                }
            });
        } catch (err) {
            console.log(err);
        }
    });

    return app;
}

/**
 * It takes a phone number and a message as parameters, and sends the message to the phone number
 * @param {string} number - The phone number you want to send the SMS to.
 * @param {string} message - The message you want to send.
 */
export function sendSMS (number: string, message: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_NUMBER;

    console.log(accountSid, authToken);
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: message,
            from: twilioNumber,
            to: number
        })
        .then((message: any) => console.log(message.sid));
}
main();

