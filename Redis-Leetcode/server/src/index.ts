import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();
const subscriber = createClient();

client.on('error', (error) => {
    console.error('Error connecting to Redis', error);
});

subscriber.on('error', (error) => {
    console.error('Error connecting to Redis (Subscriber)', error);
});

const connectToRedis = async () => {
    if (!client.isOpen) {
        try {
            await client.connect();
            console.log('Connected to Redis (Client)');
        } catch (error) {
            console.error('Error connecting to Redis (Client)', error);
        }
    } else {
        console.log('Redis client is already connected');
    }

    if (!subscriber.isOpen) {
        try {
            await subscriber.connect();
            console.log('Connected to Redis (Subscriber)');
            await subscriber.subscribe('submissions', (message) => {
                console.log('Received submission:', message);
            });
        } catch (error) {
            console.error('Error connecting to Redis (Subscriber)', error);
        }
    } else {
        console.log('Redis subscriber is already connected');
    }
};

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/submit', async (req, res) => {
    const { problemId, userId, code, language } = req.body;
    try {
        const submission = JSON.stringify({ problemId, userId, code, language });
        await client.lPush('submissions', submission);
        await client.publish('submissions', submission);
        res.status(200).send('Code submitted successfully');
    } catch (error) {
        console.error('Error submitting code', error);
        res.status(500).send('Error submitting code');
    }
});

async function startServer() {
    try {
        await connectToRedis();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error during server startup', error);
    }
}

startServer();
