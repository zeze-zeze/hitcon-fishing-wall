"use strict";

import { spawn } from "child_process";

const spawnOpts = { stdio: "inherit" };

async function main() {
  const p1 = spawn("npx", ["prisma", "db", "push"], spawnOpts);
  // await new Promise((resolve) => {
  //   p1.on("close", resolve);
  // });
  const p2 = spawn(
    "npx",
    ["prisma", "generate", "--schema", "./prisma/badge.prisma"],
    spawnOpts
  );
}
main();
