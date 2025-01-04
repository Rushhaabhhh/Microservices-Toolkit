import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  clientId: "orders",
  brokers: ["localhost:9092"],
  logLevel: logLevel.ERROR,
});

const consumer = kafka.consumer({ groupId: "orders" });
const producer = kafka.producer();

export { consumer, producer };