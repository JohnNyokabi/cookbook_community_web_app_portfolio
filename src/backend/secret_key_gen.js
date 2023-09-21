const fs = require('fs');
const crypto = require('crypto');

function generateSecretKey() {
  const newSecretKey = crypto.randomBytes(32).toString('hex');
  return newSecretKey;
}

const envPath = '.env';

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

const secretKeyIndex = envContent.indexOf('SECRET_KEY=');

if (secretKeyIndex === -1) {
  const newSecretKey = generateSecretKey();

  envContent += `SECRET_KEY=${newSecretKey}\n`;

  fs.writeFileSync(envPath, envContent);

  console.log('Secret key updated:', newSecretKey);
} else {
  const existingSecretKey = envContent
    .split('\n')
    .find((line) => line.startsWith('SECRET_KEY='))
    .split('=')[1];

  //console.log('Secret key already exists:', existingSecretKey);
}
