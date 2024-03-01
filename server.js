const express = require("express");
const mongoConnection = require("./config/mongo");
const itemRoutes = require("./src/server/route/item");
const initializeDatabase = require("./scripts/initMongoDB");

const PORT = process.env.PORT || 8999;
const app = express();

mongoConnection().then(r => console.log("Connected to MongoDB"));
// initializeDatabase().then(r => console.log("Database initialized"));

app.use(express.json());

app.use('/api/v1/items', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});