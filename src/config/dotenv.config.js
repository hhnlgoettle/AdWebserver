import fs from 'fs';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development' && fs.existsSync('.env.dev')) {
  dotenv.config({ path: '.env.dev' });
} else {
  dotenv.config();
}

process.env.JWT_PRIV_KEY = fs.readFileSync('./keys/id_rsa', 'utf8');
process.env.JWT_PUB_KEY = fs.readFileSync('./keys/id_rsa.pub', 'utf8');
