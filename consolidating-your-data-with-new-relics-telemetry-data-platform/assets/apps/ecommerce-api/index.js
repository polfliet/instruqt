require('@newrelic/koa');
const newrelicFormatter = require('@newrelic/winston-enricher')
const Koa = require('koa');
const Router = require('@koa/router');
const winston = require('winston');
const redis = require("redis");
const util = require("util");

const logger = winston.createLogger({
    level: 'info',
    //defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    ],
  });

if (process.env.LOG_FILE == 'TRUE') {
    logger.add(new winston.transports.File({
        filename: 'logs/ecommerce-api.log',
        format: winston.format.combine(
            winston.format.json(),
            newrelicFormatter()
        )
    }));
}
const client = redis.createClient({ host: 'redis' });
client.on("error", function(error) {
  console.error(error);
});

const incrbyfloatAsync = util.promisify(client.incrbyfloat).bind(client);
const getAsync = util.promisify(client.get).bind(client);

const app = new Koa();
const router = new Router();

router.post('/checkout', async (ctx, next) => {
    await next();
    const checkoutAmount = (Math.random() * 100).toFixed(2);
    logger.info(`processed checkout for $${checkoutAmount}`, { checkoutAmount: Number(checkoutAmount) });
    await incrbyfloatAsync('dailytotal', checkoutAmount);
    ctx.response.type = 'application/json';
    ctx.response.body = { checkoutAmount: Number(checkoutAmount) };
});

router.get('/dailytotal', async (ctx, next) => {
  await next();
  let t = await getAsync('dailytotal');
  ctx.response.type = 'application/json';
  ctx.response.body = { dailyTotal: Number(t) };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
    logger.info('listening on port 3000');
});