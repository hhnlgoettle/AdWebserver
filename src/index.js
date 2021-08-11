import dotenv from 'dotenv';
import fs from 'fs';
import Application from './backend';

if (process.env.NODE_ENV === 'development' && fs.existsSync('.env.dev')) {
  dotenv.config({ path: '.env.dev' });
} else {
  dotenv.config();
}
const app = new Application();
app.start();
