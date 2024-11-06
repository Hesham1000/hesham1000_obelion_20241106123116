const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('todo', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
});

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value) {
            const salt = bcrypt.genSaltSync(10);
            this.setDataValue('password', bcrypt.hashSync(value, salt));
          },
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              const salt = await bcrypt.genSalt(10);
              user.password = bcrypt.hashSync(user.password, salt);
            }
          },
        },
      }
    );
  }

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;