import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'payment',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const run = async () => {
 
  await producer.connect();
  await producer.send({
    topic: 'payment',
    messages: [
      { value: 'Hello KafkaJS user from NodeJS!' },
    ],
  });
};

run().catch(console.error);