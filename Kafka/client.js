require('dotenv').config();  
const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
  clientId: 'my-app',
  brokers: [process.env.KAFKA_BROKER], 
});
