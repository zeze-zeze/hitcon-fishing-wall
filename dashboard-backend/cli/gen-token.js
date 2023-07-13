const { tokenUrlsafe } = require("../common/utils");

const nbytes = parseInt(process.argv[2]) || 48;

console.log(tokenUrlsafe(nbytes));
