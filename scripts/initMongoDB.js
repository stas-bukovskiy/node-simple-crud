const mongoConnection = require('../config/mongo');
const Item = require('../src/server/model/item');
const {connection} = require("mongoose");

const initializeDatabase = async () => {
    try {
        await mongoConnection();

        const sampleItems = [
                {
                    "name": "Laptop",
                    "cellId": "A1",
                    "description": "High-performance gaming laptop",
                    "quantity": 10,
                    "price": 1500,
                    "category": "Electronics"
                },
                {
                    "name": "Smartphone",
                    "cellId": "B2",
                    "description": "Latest model with advanced features",
                    "quantity": 20,
                    "price": 800,
                    "category": "Electronics"
                },
                {
                    "name": "Coffee Maker",
                    "cellId": "C3",
                    "description": "Automatic espresso machine",
                    "quantity": 15,
                    "price": 300,
                    "category": "Appliances"
                },
                {
                    "name": "Desk Chair",
                    "cellId": "D4",
                    "description": "Ergonomic office chair",
                    "quantity": 25,
                    "price": 200,
                    "category": "Furniture"
                },
                {
                    "name": "Bluetooth Speaker",
                    "cellId": "E5",
                    "description": "Portable speaker with high-quality sound",
                    "quantity": 30,
                    "price": 150,
                    "category": "Electronics"
                }
        ];

        const insertedItems = await Item.insertMany(sampleItems);

        console.log('Sample data inserted successfully:', insertedItems);
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await connection.close();
    }
};

module.exports = initializeDatabase;