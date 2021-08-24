// this will populate process.env. do not move import './config/dotenv.config'; below Application
import './config/dotenv.config';
import Application from './backend';

const app = new Application();
app.start();
