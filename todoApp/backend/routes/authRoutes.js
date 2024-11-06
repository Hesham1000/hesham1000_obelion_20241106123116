const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { createUserTable, insertUser, getUserByEmail, updateUserPassword, deleteUser } = require('../database/userCredentials');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
  }
});

module.exports = router;

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('todo', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
});

const createUserTable = async () => {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `);
};

const insertUser = async (email, password) => {
  await sequelize.query(`
    INSERT INTO users (email, password) VALUES ('${email}', '${password}');
  `);
};

const getUserByEmail = async (email) => {
  return await sequelize.query(`
    SELECT * FROM users WHERE email = '${email}';
  `, { type: Sequelize.QueryTypes.SELECT });
};

const updateUserPassword = async (email, newPassword) => {
  await sequelize.query(`
    UPDATE users SET password = '${newPassword}' WHERE email = '${email}';
  `);
};

const deleteUser = async (email) => {
  await sequelize.query(`
    DELETE FROM users WHERE email = '${email}';
  `);
};

module.exports = {
  createUserTable,
  insertUser,
  getUserByEmail,
  updateUserPassword,
  deleteUser,
};
sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
sql
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', []),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};