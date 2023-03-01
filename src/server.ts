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
    // get view path from src folder
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
        let sensors = await getBin();
        await ctx.render('index', {
            title: 'Sensor Dashboard',
            message: 'You can see the sensors data here : ',
            data : {
                sensors
            }
        });
    });

    return app;
}

main();

