const newrelic = require('newrelic');
const redis = require('redis');
const amqp = require('amqplib');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const redisHost = process.env.GET_HOSTS_ENV !== 'env' ? 'redis-master' : process.env.REDIS_MASTER_SERVICE_HOST;

const client = redis.createClient({ host: redisHost, port: 6379 });
app.locals.newrelic = newrelic;

// Do some heavy calculations
var lookBusy = function() {
  const end = Date.now() + 50;
  while (Date.now() < end) {
    const doSomethingHeavyInJavaScript = 1 + 2 + 3;
  }
};

var listenToQueue = function() {
  console.error('Worker ' + process.env.NEW_RELIC_METADATA_KUBERNETES_POD_NAME + ': start listening to queue');

  amqp.connect('amqp://user:bitnami@rabbitmq:5672').then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var q = 'message';
      var ok = ch.assertQueue(q, {durable: false});

      ok = ok.then(function(_qok) {
        return ch.consume(q, function(msg) {
          lookBusy();
          var message = msg.content.toString();
          console.error(" [x] Received '%s'", message);

          // Push to Redis
          client.set('message', message, function(err) {
            if (err) {
              console.error('Worker ' + process.env.NEW_RELIC_METADATA_KUBERNETES_POD_NAME + ': Error pushing to Redis');
            }
          });
        }, {noAck: true});
      });

      return ok.then(function(_consumeOk) {
        console.error(' [*] Waiting for messages');
      });
    });
  }).catch(console.error);
}

client.on('error', function(err) {
  console.error('Worker: Could not connect to redis host:', err);
  newrelic.noticeError(err);
})

listenToQueue();
