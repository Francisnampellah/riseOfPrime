// app/lib/redis.ts
import { Redis } from '@upstash/redis';

// Initialize Redis client with your Upstash credentials
const redis = new Redis({
  url: 'https://musical-gibbon-56826.upstash.io',  // Use environment variable for sensitive data
  token: "Ad36AAIjcDE1NzgzZTk4MzIyNmM0MWZlODQ2ZDI5MGFhN2NlNjRiN3AxMA",
});

// Function to store a document or query result in Redis
export async function storeDocument(query: string, result: string) {
  try {
    // Store the result in Redis with the query as the key
    await redis.set(query, result, { ex: 3600 });  // Optional: set expiration (3600 seconds = 1 hour)
  } catch (error) {
    console.error("Error storing document in Redis:", error);
  }
}

// Function to retrieve document or query result from Redis
export async function getDocument(query: string) {
  try {
    // Fetch the result from Redis by query key
    const result = await redis.get(query);
    return result;
  } catch (error) {
    console.error("Error retrieving document from Redis:", error);
    return null;
  }
}
