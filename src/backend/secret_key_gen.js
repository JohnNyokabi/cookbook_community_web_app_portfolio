const fs = require('fs');
const crypto = require('crypto');


const newSecretKey = crypto.randomBytes(32).toString('hex');

const envPath = '.env';

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Check if the secret key already exists in the .env file
const secretKeyIndex = envContent.indexOf('SECRET_KEY=');

if (secretKeyIndex !== -1) {
  // Replace the existing secret key with the new one
  const start = secretKeyIndex;
  const end = envContent.indexOf('\n', start);
  envContent = envContent.slice(0, start) + `SECRET_KEY=${newSecretKey}\n` + envContent.slice(end);
} else {
  envContent += `SECRET_KEY=${newSecretKey}\n`;
}

fs.writeFileSync(envPath, envContent);

//console.log('Secret key updated:', newSecretKey);
