import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'payment',
  brokers: ['localhost:9092']
});


const consumer = kafka.consumer({ groupId: 'payment' });

const run = async () => {

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