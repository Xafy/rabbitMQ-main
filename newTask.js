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

        const msg = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertQueue(queue, {
        durable: true
        });
        channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});