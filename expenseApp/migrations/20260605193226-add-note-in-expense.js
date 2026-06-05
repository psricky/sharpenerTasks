'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Expenses', 'note', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Always write the reverse action to allow rollbacks
    await queryInterface.removeColumn('Expenses', 'note');
  }
};