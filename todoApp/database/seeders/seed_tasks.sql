module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Tasks', [
    {
      title: 'Task 1',
      description: 'Description for Task 1',
      dueDate: new Date(),
      priority: 'Medium'
    },
    {
      title: 'Task 2',
      description: 'Description for Task 2',
      dueDate: new Date(),
      priority: 'High'
    }
  ]),
  
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Tasks', null, {})
};
