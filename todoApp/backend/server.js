const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'db',
    user: 'agent',
    password: 'agentpass',
    database: 'Obelien AI'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', notificationRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
