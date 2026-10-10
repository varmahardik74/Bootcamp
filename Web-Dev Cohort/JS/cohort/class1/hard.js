const crypto = require('crypto');

const input = "Hardik";
const input2 = "Varma";
const hash = crypto.createHash('sha256').update(input).digest('hex');
const hash1 = crypto.createHash('sha256').update(input2).digest('hex');

console.log(hash);
console.log(hash1);


