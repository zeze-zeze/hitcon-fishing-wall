const { prisma } = require("../../common");

async function getFishFlagCount(username, token) {
  return await prisma.$queryRaw`
   SELECT flagCount
   FROM WallFish
   WHERE username = ${username} AND token = ${token}`;
}

async function getFish() {
  return await prisma.$queryRaw`
   SELECT username, time, token, description, flagCount
   FROM WallFish
   ORDER BY time DESC, flagCount DESC
   LIMIT 1000`;
}

async function createFish({ username, time, token, description, flagCount }) {
  return await prisma.WallFish.upsert({
    where: {
      username,
      token,
    },
    update: {
      description,
      flagCount,
    },
    create: {
      time,
    },
  });
}

async function updateFishDescription({ username, token, description }) {
  return await prisma.WallFish.upsert({
    where: {
      username,
      token,
    },
    update: {
      description,
    }
  });
}

async function updateFishFlagCount({ username, token, flagCount }) {
  return await prisma.WallFish.upsert({
    where: {
      username,
      token,
    },
    update: {
      flagCount,
    }
  });
}

module.exports = {
  getFish,
  createFish,
  getFishFlagCount,
  updateFishDescription,
  updateFishFlagCount
};
