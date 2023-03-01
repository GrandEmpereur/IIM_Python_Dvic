import Router from "koa-router";
import * as fs from "date-fns";
import koaBody from "koa-body";
import { getBin, CreateBin } from "../services/axios";

const ROUTER_OPTIONS = {
    prefix: '/api',
};

export default new Router(ROUTER_OPTIONS)
    /**
     * @api {post} /create/sensors Create a new sensor
     * @apiName CreateSensor
     * @apiGroup Sensors
    */
    .post('/create/sensors', koaBody(), async (ctx) => {
        const { temperature, humidity } = ctx.request.body;
        const date = fs.format(new Date(), "dd/MM/yyyy HH:mm:ss");
        const data = {
            temperature,
            humidity,
            date
        }
        const bin = await CreateBin(data);
        ctx.body = bin;
    })

    /**
     * @api {get} /see/sensors See all sensors
     * @apiName SeeSensors
     * @apiGroup Sensors
    */ 
    .get('/see/sensors', async (ctx) => {
        const bin = await getBin();
        ctx.body = bin;
    })

