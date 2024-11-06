javascript
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
