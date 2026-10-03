const fs = require('fs');
const [,, mode, target, b64] = process.argv;
const content = Buffer.from(b64, 'base64').toString('utf8');
if (mode === 'write') {
  fs.writeFileSync(target, content, 'utf8');
} else {
  fs.appendFileSync(target, content, 'utf8');
}
console.log(mode, target, 'done. Total bytes:', fs.statSync(target).size);