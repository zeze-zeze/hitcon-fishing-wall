const { prisma } = require("../../common");

async function getTreasureStats({ per_sec } = { per_sec: 60 }) {
  // https://stackoverflow.com/questions/43003139/how-can-i-select-one-row-of-data-per-hour
  // https://stackoverflow.com/questions/1485391/how-to-get-first-and-last-record-from-a-sql-query
  // this query select the first row in table, and last row in each interval
  return await prisma.$queryRaw`
  SELECT level_0, level_1, level_2, level_3, finished, createdAt
  FROM (
    SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY createdAt/1000/${per_sec}
      ORDER BY createdAt DESC
    ) AS seqnum,
    ROW_NUMBER() OVER (ORDER BY createdAt) AS torder
    FROM TreasureStats
  )
  WHERE seqnum = 1 OR torder = 1
  ORDER BY createdAt
  `;
}

async function createTreasureStats({
  level_0,
  level_1,
  level_2,
  level_3,
  finished,
}) {
  return await prisma.treasureStats.create({
    data: {
      level_0,
      level_1,
      level_2,
      level_3,
      finished,
    },
  });
}

module.exports = {
  getTreasureStats,
  createTreasureStats,
};
