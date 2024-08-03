module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            id: 1,
            name: "Matheus de Sousa",
            email: "matheus@gmail.com",
            password: "matheus123",
          },
          {
            id: 2,
            name: "Sostenes",
            email: "sostenes@gmail.com",
            password: "sostenes123",
          },
        ],
        {}
      );
    } catch (error) {
      console.error("Error during bulk insert:", error);
    }
  },
};
