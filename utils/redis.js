import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client
 */
class RedisClient {
    /**
     * Creates a new Redis client instance.
     */
    constructor() {
        this.client = createClient();
        this.isClientConnected = true;
        this.client.on_connect('error', (err) => {
            console.error('Redis client failed to connect:', err.message || err.toString());
            this.isClientConnected = false;
        });
        this.client.on('connect', () => {
            this.isClientConnected = true;
        });
    }

    /**
     * Checks if the client's connection to the redis server is active.
     * @return {boolean}
     */
    isAlive() {
        return this.isClientConnected;
    }

    /**
     * Retrieves value of a given key.
     * @param {String} key The key of the item / value to retrieve
     * @return {String | Object}
     */
    async get(key) {
        return promisify(this.client.GET).bind(this.client)(key);
    }

    /**
     * Stores a key and value with an expiration set by the duration.
     * @param {String} key The key to store
     * @param {Number | String | Boolean} value The value to store
     * @param {Duration} duration The expiration duration
     * @returns {Promise<void>}
     */
    async set(key, value, duration) {
        await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
    }

    /**
     * Removes a key and value from Redis.
     * @param {String} key The key of the item to remove.
     * @returns {Promise<void}
     */
    async del(key) {
        await promisify(this.client.DEL).bind(this.client)(key);
    }
}

export const redisClient = new RedisClient();
export default redisClient;