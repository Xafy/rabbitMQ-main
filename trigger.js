#!/usr/bin/env node

const sendMessage = require('./send');

// Custom message to send
const customMessage = 'This is a custom message';

// Call the sendMessage function from send.js and pass the custom message
sendMessage(customMessage);