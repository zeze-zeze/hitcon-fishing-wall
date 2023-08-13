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
 *   timestamp: Date,
 * }}
 */
async function createPopcatRecord({ cardUid, score, timestamp }) {
  return await prisma.badgePopcat.create({
    data: {
      cardUid,
      score,
      timestamp,
    },
  });
}

/**
 * @returns {Promise<{
 *   username: string,
 *   score: number,
 *   timestamp: Date,
 * }[]>}
 */
async function getPopcatWithUser() {
  // prisma doesn't have left join function...
  return await prisma.$queryRaw`
    SELECT Card.username, popcat.score, popcat.timestamp
    FROM BadgePopcat AS popcat
    LEFT JOIN Card
    ON popcat.cardUid=Card.uid
    ORDER BY popcat.score DESC, popcat.timestamp ASC`;
}

/**
 * @param {{
 *   date: string,
 * }}
 * @returns {Promise<{
 *   username: string,
 *   score: number,
 *   timestamp: Date,
 * }[]>}
 */
async function getPopcatRank({ date }) {
  // prisma doesn't have left join function...
  const from = `${date}T00:00:00+08:00`;
  const to = `${date}T24:00:00+08:00`;
  return await prisma.$queryRaw`
    SELECT Card.username, max(popcat.score) AS score, popcat.timestamp
    FROM BadgePopcat AS popcat
    LEFT JOIN Card
    ON popcat.cardUid=Card.uid
    WHERE popcat.timestamp/1000 BETWEEN unixepoch(${from}) and unixepoch(${to})
    GROUP BY popcat.cardUid
    ORDER BY score DESC, popcat.timestamp ASC`;
}

/**
 * @returns {Promise<{
 *   username: string,
 *   score: number,
 *   timestamp: Date,
 * }[]>}
 */
async function getDinoWithUser() {
  return await prisma.$queryRaw`
   SELECT Card.username, dino.score, dino.timestamp
   FROM BadgeDino AS dino
   LEFT JOIN Card
   ON dino.cardUid=Card.uid
   ORDER BY dino.score DESC, dino.timestamp ASC`;
}

/**
 * @param {{
 *   date: string,
 * }}
 * @returns {Promise<{
 *   username: string,
 *   score: number,
 *   timestamp: Date,
 * }[]>}
 */
async function getDinoRank({ date }) {
  // prisma doesn't have left join function...
  const from = `${date}T00:00:00+08:00`;
  const to = `${date}T24:00:00+08:00`;
  return await prisma.$queryRaw`
   SELECT Card.username, max(dino.score) AS score, dino.timestamp
   FROM BadgeDino AS dino
   LEFT JOIN Card
   ON dino.cardUid=Card.uid
   WHERE dino.timestamp/1000 BETWEEN unixepoch(${from}) and unixepoch(${to})
   GROUP BY dino.cardUid
   ORDER BY score DESC, dino.timestamp ASC`;
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
 *   timestamp: Date,
 * }}
 */
async function createDinoRecord({ cardUid, score, timestamp }) {
  return await prisma.badgeDino.create({
    data: {
      cardUid,
      score,
      timestamp,
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
  createPopcatRecord,
  getDinoWithUser,
  deleteAndCreateDinos,
  createDinoRecord,
  getEmojiWithUser,
  deleteAndCreateEmoji,
  createEmojiRecord,
  getPopcatRank,
  getDinoRank,
};
