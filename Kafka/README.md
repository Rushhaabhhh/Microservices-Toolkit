# Apache Kafka 

Apache Kafka is a distributed event streaming platform designed for high-throughput, low-latency data processing. Common use cases include messaging, log aggregation, stream processing, and real-time analytics. 

### Key Components
- **Topics**: Logical channels where messages are written and read.
- **Partitions**: Subdivisions of a topic for scalability, maintaining message order within each partition.
- **Producers**: Applications that publish data to topics.
- **Consumers**: Applications that subscribe to topics and read data.
- **Brokers**: Kafka servers that store data and handle client requests.
- **Zookeeper**: Used for managing cluster metadata (deprecated in newer versions).
- 
- **Replication**: Duplicates partitions across brokers for fault tolerance.
- **Offset**: A unique ID assigned to each message within a partition for tracking and retrieval.
- **Consumer Groups**: Allow load balancing by distributing topic messages among multiple consumers.
- **Retention Policy**: Defines how long Kafka retains data, either based on time or size.
- 
- **Kafka Streams**: A library for real-time data processing using Kafka.
- **Kafka Connect**: Facilitates data integration with other systems like databases and file systems.
- **Schema Registry**: Ensures consistent data serialization and compatibility between producers and consumers.
- **Exactly Once Semantics**: Guarantees message delivery without duplication or loss, even in failure scenarios.

### Kafka Ecosystem Overview

![Pasted image 20250106101738](https://github.com/user-attachments/assets/a97f6f16-3ad1-4c77-a6b6-98370243fcb8)


## Docker Setup for Kafka

### Start Zookeeper Container
```bash
docker run -p 2181:2181 zookeeper
```

- Exposes port 2181 for Zookeeper to coordinate Kafka brokers.

### Environment Variables for Kafka Setup

- KAFKA_ZOOKEEPER_CONNECT : Connects Kafka to Zookeeper.
- KAFKA_ADVERTISED_LISTENERS : Advertises the broker’s address.
- KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR : Sets the replication factor for the offsets topic.
- KAFKA_BROKER : Port for Kafka broker communication.


## Code Explanation and Execution
1. Client Setup (client.js)
    - Initializes a Kafka client using kafkajs.
    - Configuration :
        - `clientId` : Identifies the client.
        - `brokers` : Kafka broker addresses.

2. Admin Operations (admin.js)
    - Connects to Kafka as an admin client.
    - Creates a topic rider-updates with 2 partitions:
        - Partition 0: Assigned to the "north" location.
        - Partition 1: Assigned to other locations.
    - Steps : Connect to Kafka --> Create the topic --> Disconnect

3. Producer (producer.js)
    - Publishes rider location updates to the rider-updates topic.
    - Steps :
        - Connect as a producer.
        - Read user input (rider name and location).
        - Send messages to specific partitions based on location.

4. Consumer (consumer.js)
    - Subscribes to rider-updates and processes messages.
    - Configuration : `groupId` : Identifies the consumer group.
    - Steps :
        - Connect to Kafka.
        - Subscribe to the topic.
        - Run a loop to consume messages and print details.

### Running the Code : 

- Run the docker container
```bash
docker-compose up
```


- Concurrently starts all the servers 
```bash
npm start 
```

- Create producers
```bash
tony south
tony north
```

## Running kafka on terminal without Zookeeper

```bash
# Run command
docker run -p 9092:9092 apache/kafka:3.7.1

# Find container id and execute kafka inside docker 
docker ps 
docker exec -it 9e7290d11bf2  /bin/bash
cd /opt/kafka/bin

# Create a topic 
./kafka-topics.sh --create --topic topic_name --bootstrap-server localhost:9092


# Create a Consumer 
./kafka-console-consumer.sh --topic topic_name --from-beginning --bootstrap-server localhost:9092

#Create a Producer
./kafka-console-producer.sh --topic payments --bootstrap-server localhost:9092

# Send messages from Producers to Consumers ( many to many ) 
```
