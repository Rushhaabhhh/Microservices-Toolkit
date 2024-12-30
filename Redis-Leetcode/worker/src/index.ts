import { createClient } from 'redis';

const client = createClient();

async function main() {
    try {
        await client.connect();

        while (true) {
            const response = await client.brPop('submissions', 0);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            
            const message = JSON.parse(response.element);
            console.log('Received submission:', message);
        }
    } catch (error) {
        console.error('Error connecting to Redis', error);
        setTimeout(main, 5000); 
    }
}

main();
