const { PrismaClient } = require("@prisma/client");
const { PrismaClient: BadgeClient } = require("../src/generated/client");

const prisma = new PrismaClient();
// multiple db connections
// https://github.com/prisma/prisma/issues/2443#issuecomment-630679118
const badge = new BadgeClient();

// https://github.com/prisma/prisma/issues/5026#issuecomment-759596097
// prisma.$on("query", async (e) => {
//   console.log(`${e.query} ${e.params}`);
// });

module.exports = {
  prisma,
  badge,
};
