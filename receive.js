const amqp = require('amqplib/callback_api');

function consumerFunction() {
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

      console.log(" [*] Waiting for messages in %s. To exit, press CTRL+C", queue);

      channel.consume(queue, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());

        // Call a function based on the received message
        if (msg.content.toString() === 'This is a custom message') {
          customMessageFunction();
        } else {
          defaultMessageFunction();
        }
    }, {
        noAck: true
      });
    });
  });
}

// Custom function to handle a specific message
function customMessageFunction() {
  console.log("Custom message function called.");
}

// Default function to handle other messages
function defaultMessageFunction() {
  console.log("Default message function called.");
}

consumerFunction(); // Start the consumer function