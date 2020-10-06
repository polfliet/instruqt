require('@newrelic/koa');
const newrelicFormatter = require('@newrelic/winston-enricher')
const Koa = require('koa');
const Router = require('@koa/router');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'user-service' },
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

const app = new Koa();
const router = new Router();

router.get('/checkout', async (ctx, next) => {
    await next();
    logger.info('processed checkout');
    ctx.response.type = 'application/json';
    ctx.response.body = { status: 'ok' };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
    logger.info('listening on port 3000');
});