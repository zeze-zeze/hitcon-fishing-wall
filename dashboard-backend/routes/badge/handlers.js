const { Prisma } = require("@prisma/client");
const { prisma } = require("../../common");

// join function
// https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#tagged-template-helpers
// https://github.com/blakeembrey/sql-template-tag/blob/main/src/index.ts#L98
// blob literals
// https://stackoverflow.com/questions/20133602/sqlite3-trigger-to-convert-hex-text-into-binary-blob-equivalent
// https://www.sqlite.org/lang_expr.html#litvalue
async function checkNonExistentUids({ uids }) {
  const result = await prisma.$queryRaw`SELECT column1 AS uid
  FROM (VALUES (${Prisma.join(uids, "),(")}))
  EXCEPT SELECT uid FROM Card`;
  return result;
}

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

// https://github.com/prisma/prisma/issues/10710#issuecomment-1198906656
async function deleteAndCreatePopcats(data) {
  const result = await prisma.$transaction([
    prisma.badgePopcat.deleteMany({}),
    ...data.map((row) =>
      prisma.badgePopcat.create({
        data: row,
      })
    ),
  ]);
  return {
    delete_count: result[0].count,
    insert_count: result.length - 1,
  };
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

async function deleteAndCreateDinos(data) {
  const result = await prisma.$transaction([
    prisma.badgeDino.deleteMany({}),
    ...data.map((row) =>
      prisma.badgeDino.create({
        data: row,
      })
    ),
  ]);
  return {
    delete_count: result[0].count,
    insert_count: result.length - 1,
  };
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

async function deleteAndCreateEmoji(data) {
  const result = await prisma.$transaction([
    prisma.badgeEmoji.deleteMany({}),
    ...data.map((row) =>
      prisma.badgeEmoji.create({
        data: row,
      })
    ),
  ]);
  return {
    delete_count: result[0].count,
    insert_count: result.length - 1,
  };
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

module.exports = {
  createOrUpdateBadgeInfo,
  checkNonExistentUids,
  deleteAndCreatePopcats,
  getPopcatWithUser,
  createOrUpdatePopcat,
  getDinoWithUser,
  deleteAndCreateDinos,
  createOrUpdateDino,
  getEmojiWithUser,
  deleteAndCreateEmoji,
  createEmojiRecord,
};
