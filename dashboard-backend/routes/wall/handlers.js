const { prisma } = require("../../common");

async function getFishFlagCount({ username, token }) {
  const record = await prisma.wallFish.findFirstOrThrow({
    select: {
      flagCount: true,
    },
    where: {
      username,
      token,
    },
  });
  return record.flagCount;
}

async function getFish() {
  return prisma.wallFish.findMany({
    select: {
      username: true,
      time: true,
      description: true,
      flagCount: true,
    },
    orderBy: [
      {
        time: "desc",
      },
      { flagCount: "desc" },
    ],
    take: 1000,
  });
}

async function createFish({ username, token, description, flagCount }) {
  return await prisma.WallFish.create({
    data: {
      username,
      token,
      description,
      flagCount,
    },
  });
}

async function updateFishDescription({ username, token, description }) {
  return await prisma.wallFish.update({
    data: {
      description,
    },
    where: {
      username,
      token,
    },
  });
}

async function updateFishFlagCount({ username, token, flagCount }) {
  return await prisma.WallFish.update({
    data: {
      flagCount,
    },
    where: {
      username,
      token,
    },
  });
}

module.exports = {
  getFish,
  createFish,
  getFishFlagCount,
  updateFishDescription,
  updateFishFlagCount,
};
