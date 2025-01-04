import { Kafka, logLevel } from "kafkajs";
const kafka = new Kafka({
  clientId: "products",
  brokers: ['localhost:9092'],
  logLevel: logLevel.ERROR,
});

const consumer = kafka.consumer({ groupId: "products" });
const producer = kafka.producer();

export { consumer, producer };