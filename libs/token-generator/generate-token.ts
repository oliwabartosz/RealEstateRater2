import * as crypto from "crypto";

const ACCESS_TOKEN_SECRET = crypto.randomBytes(64).toString('hex');
const REFRESH_TOKEN_SECRET = crypto.randomBytes(64).toString('hex');

console.log('ACCESS_TOKEN_SECRET=' + ACCESS_TOKEN_SECRET);
console.log('REFRESH_TOKEN_SECRET=' + REFRESH_TOKEN_SECRET);