const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', async (req, res) => {

    // Create SQLite database connection
    const dbPath = './database/test3.db';
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error connecting to SQLite database:', err.message);
        } else {
            console.log('Connected to SQLite database:', dbPath);
        }
    });

    // Retrieve all data from "users" table
    const getAllUsers = () => {
        const query = `SELECT * FROM users`;
        db.all(query, (err, rows) => {
            if (err) {
                console.error('Error retrieving data:', err.message);
            } else {
                console.log('All data from users table:');
                rows.forEach(row => {
                    console.log(row);
                    res.status(200).json({row});
                });
            }
        });
    };

    // Call function to retrieve all users
    getAllUsers();


})

module.exports = router;