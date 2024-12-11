import * as mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from "mongodb/lib/collection";
import * as envloader from '.env_loader';

/**
 * Represents a MongoDB client
 */
class DBClient {
    /**
     * Creates a new MongoDB client instance.
     */
    constructor() {
        envloader();
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'file_manager';
        const dbURL = `mongodb://${host}:${port}/${database}`;

        this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
        this.client.connect();
    }

    /**
     * Checks if the client's connection to mongodb is alive.
     * @return {boolean}
     */
    isAlive() {
        return this.client.isConnected();
    }

    /**
     * Retrieves the number of users in the database
     * @return {Promise<Number>}
     */
    async nbUsers() {
        return this.client.db().collection('users').countDocuments();
    }

    /**
     * Retrieves the number of files in the database
     * @return {Promise<Number>}
     */
    async nbFiles() {
        return this.client.db().collection('files').countDocuments();
    }

    /**
     * Retrieves a reference to the `users` collection.
     * @return {Promise<Collection>}
     */
    async usersCollection() {
        return this.client.db().collection('users');
    }

    /**
     * Retrieves a reference to the `files` collection.
     * @return {Promise<Collection>}
     */
    async filesCollection() {
        return this.client.db().collection('files');
    }
}

export const dbClient = new DBClient();
export default dbClient;