const amqp = require('amqplib/callback_api');

function sendMessage(message) {
  amqp.connect('amqps://hiwqsjmr:yI5_VrloDNDQG7iTQfVd7zR0y4wecVZM@rattlesnake.rmq.cloudamqp.com/hiwqsjmr', function(error0, connection) {
    if (error0) {
      throw error0;
    }

    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }

      const queue = 'hello';

      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(message));

      console.log(" [x] Sent %s", message);

      setTimeout(function() {
        connection.close();
        process.exit(0);
      }, 500);
    });
  });
}

module.exports = sendMessage;