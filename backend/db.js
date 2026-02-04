const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        // Read credentials from environment and trim to remove extra whitespace/newlines
        const username = process.env.MONGO_USERNAME?.trim();
        const password = process.env.MONGO_PASSWORD?.trim();
        const host = 'mongo-svc';  // Kubernetes service name for MongoDB
        const dbName = 'todo';

        // Build the MongoDB URI dynamically
        const uri = `mongodb://${username}:${password}@${host}:27017/${dbName}?directConnection=true`;

        // Optional: retry logic if MongoDB is not ready yet
        let retries = 5;
        while (retries > 0) {
            try {
                await mongoose.connect(uri, connectionParams);
                console.log("Connected to MongoDB.");
                break;
            } catch (err) {
                retries--;
                console.log(`MongoDB connection failed, retrying in 5s... (${retries} retries left)`, err);
                await new Promise(r => setTimeout(r, 5000));
            }
        }

        if (retries === 0) {
            console.error("Failed to connect to MongoDB after multiple attempts.");
            process.exit(1);  // optional: fail pod if DB is unreachable
        }

    } catch (error) {
        console.error("Could not connect to MongoDB.", error);
        process.exit(1);  // fail pod if unexpected error
    }
};
