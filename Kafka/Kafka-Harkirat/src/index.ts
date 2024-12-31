import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const consumer = kafka.consumer({ groupId: 'payment-service' });

const run = async () => {
 
  await producer.connect();
  await producer.send({
    topic: 'payment',
    messages: [
      { value: 'Hello KafkaJS user from NodeJS!' },
    ],
  });

  await consumer.connect();
  await consumer.subscribe({ topic: 'payment', fromBeginning: true }); 

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      });
    }
  });
};

run().catch(console.error);