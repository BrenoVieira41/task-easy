import { Sequelize } from 'sequelize-typescript';
import { Users } from '../module/User/UserModel';
import { Tasks } from '../module/Task/TaskModel';
import { config } from 'dotenv';

config();

export const database = new Sequelize(process.env.DATABASE, { models: [Tasks, Users] ,define: { timestamps: false } });
