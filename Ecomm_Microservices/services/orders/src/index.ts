import { config } from 'dotenv';
import mongoose from 'mongoose';

import app from './app';
import { consumer, producer } from './kafka';

config();

const main = async () => {
    await mongoose.connect(process.env.MONGO_URI || '');
    await consumer.connect();
};

main()
  .then(() => {
    app.listen(process.env["ORDERS_SERVICE_PORT"], () => {
      console.log(
        `Orders service is running on port ${process.env["ORDERS_SERVICE_PORT"]}`
      );
    });
  })
  .catch(async (e) => {
    console.error(e);
    await producer.disconnect();
    await consumer.disconnect();
    process.exit(1);
  });