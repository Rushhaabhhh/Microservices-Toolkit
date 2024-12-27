const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  admin.connect();
  console.log("Adming Connection Success");

  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [rider-updates]");

  await admin.disconnect();
  console.log("Admin Disconnected");
}

init();