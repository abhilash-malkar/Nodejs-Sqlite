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

    // Create "users" table
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT,
            createdon TEXT,
            lastmodified TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            } else {
                console.log('Users table created successfully.');
            }
        });
    });

    // Insert data into "users" table
    const insertData = (name, email, password, createdOn, lastModified) => {
        const query = `INSERT INTO users (name, email, password, createdon, lastmodified) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [name, email, password, createdOn, lastModified], (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            } else {
                console.log('Data inserted successfully.');
            }
        });
    };

    // Example data insertion
    const currentDate = new Date().toISOString();
    insertData('John Doe', 'john@example.com', 'password123', currentDate, currentDate);


    res.status(200).json({
        success: true,
        message: 'Your database is successfully created!'
    });
})

module.exports = router;