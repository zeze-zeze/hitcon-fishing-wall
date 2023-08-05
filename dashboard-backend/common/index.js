const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// https://github.com/prisma/prisma/issues/5026#issuecomment-759596097
// prisma.$on("query", async (e) => {
//   console.log(`${e.query} ${e.params}`);
// });

module.exports = {
  prisma,
};
