#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqps://hiwqsjmr:yI5_VrloDNDQG7iTQfVd7zR0y4wecVZM@rattlesnake.rmq.cloudamqp.com/hiwqsjmr', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'task_queue';

        // This makes sure the queue is declared before attempting to consume from it
        channel.assertQueue(queue, {
        durable: true
        });

        channel.consume(queue, function(msg) {
        const seconds = msg.content.toString().split('.').length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function() {
            console.log(" [x] Done", msg.content.toString());
        }, seconds * 1000);
        }, {
        noAck: true
        });
    });
});