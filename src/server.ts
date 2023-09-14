import 'reflect-metadata';
import { config } from 'dotenv';
import { app } from './app';
import { database } from './database/ormconfig'

config();
const appPort = process.env.APP_PORT || 3333;

database.sync().then(() => {
  app.listen(appPort, () => console.log(`Server is running in port: ${appPort}`));
});
