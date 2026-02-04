const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        // Build MongoDB URI from environment variables
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;
        const host = 'mongo-svc';  // Kubernetes service name for MongoDB
        const dbName = 'todo';

        const uri = `mongodb://${username}:${password}@${host}:27017/${dbName}?directConnection=true`;

        await mongoose.connect(uri, connectionParams);

        console.log("Connected to database.");
    } catch (error) {
        console.error("Could not connect to database.", error);
    }
};
