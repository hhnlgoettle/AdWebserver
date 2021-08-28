/**
 * @module
 * @description reads config from your .env file
 * <p>make sure this file is executed prior to any other code execution</p>
 * <p> reads keys from keys/ directory to JWT Signature</p>
 */

import fs from 'fs';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development' && fs.existsSync('.env.dev')) {
  dotenv.config({ path: '.env.dev' });
} else {
  dotenv.config();
}

process.env.JWT_PRIV_KEY = fs.readFileSync('./keys/id_rsa', 'utf8');
process.env.JWT_PUB_KEY = fs.readFileSync('./keys/id_rsa.pub', 'utf8');
