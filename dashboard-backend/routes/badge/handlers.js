const { prisma } = require("../../common");

/**
 * @param {{
 *   uid: Buffer,
 *   username: string,
 * }}
 */
async function createOrUpdateBadgeInfo({ uid, username }) {
  return await prisma.card.upsert({
    where: {
      uid,
    },
    update: {
      username,
    },
    create: {
      uid,
      username,
    },
  });
}

/**
 * @returns {Promise<{
 *   username: string,
 *   content: string,
 *   timestamp: Date,
 * }[]>}
 */
async function getEmojiWithUser() {
  const data = await prisma.badgeEmoji.findMany({
    select: {
      content: true,
      timestamp: true,
      card: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  return data.map((i) => ({
    username: i.card.username,
    content: i.content,
    timestamp: i.timestamp,
  }));
  // return await prisma.$queryRaw`
  //   SELECT Card.username, emoji.content, emoji.timestamp
  //   FROM BadgeEmoji as emoji
  //   LEFT JOIN Card
  //   ON emoji.cardUid=Card.uid
  //   ORDER BY emoji.timestamp ASC`;
}

/**
 * @param {{
 * cardUid: Buffer,
 * content: string,
 * timestamp: string,
 * }}
 */
async function createEmojiRecord({ cardUid, content, timestamp }) {
  return await prisma.badgeEmoji.create({
    data: {
      cardUid,
      content,
      timestamp,
    },
  });
}

/**
 * @param {{
 *   cardUid: Buffer,
 *   score: number,
 * }}
 */
async function createOrUpdatePopcat({ cardUid, score }) {
  return await prisma.badgePopcat.upsert({
    where: {
      cardUid,
    },
    update: {
      score,
    },
    create: {
      cardUid,
      score,
    },
  });
}

/**
 * @returns {Promise<{
 *   username: string,
 *   score: number,
 *   updatedAt: Date,
 * }[]>}
 */
async function getPopcatWithUser() {
  // prisma doesn't have left join function...
  return await prisma.$queryRaw`
    SELECT Card.username, popcat.score, popcat.updatedAt
    FROM BadgePopcat as popcat
    LEFT JOIN Card
    ON popcat.cardUid=Card.uid
    ORDER BY popcat.score DESC, popcat.updatedAt ASC`;
}

/**
 * @returns {Promise<{
 *   username: string,
 *   score: number,
 *   updatedAt: Date,
 * }[]>}
 */
async function getDinoWithUser() {
  return await prisma.$queryRaw`
   SELECT Card.username, dino.score, dino.updatedAt
   FROM BadgeDino as dino
   LEFT JOIN Card
   ON dino.cardUid=Card.uid
   ORDER BY dino.score DESC, dino.updatedAt ASC`;
}

/**
 * @param {{
 *   cardUid: Buffer,
 *   score: number,
 * }}
 */
async function createOrUpdateDino({ cardUid, score }) {
  return await prisma.badgeDino.upsert({
    where: {
      cardUid,
    },
    update: {
      score,
    },
    create: {
      cardUid,
      score,
    },
  });
}

module.exports = {
  createOrUpdateBadgeInfo,
  getEmojiWithUser,
  createEmojiRecord,
  getPopcatWithUser,
  createOrUpdatePopcat,
  getDinoWithUser,
  createOrUpdateDino,
};
