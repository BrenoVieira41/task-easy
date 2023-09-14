import { Column, HasMany, Table, Model } from 'sequelize-typescript';
import { Tasks } from '../task/TaskModel';

@Table({ tableName: 'users', timestamps: false })
export class Users extends Model<Users> {
  @Column({ primaryKey: true, autoIncrement: true })
  readonly id: number;

  @Column({ validate: { min: 3, max: 255 } })
  name: string;

  @Column({ validate: { min: 3, max: 255 } })
  nick: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  created_at?: Date;

  @HasMany(() => Tasks)
  tasks: Tasks[];
};

export interface IUser {
  name?: string,
  nick?: string,
  email?: string,
  password?: string
}
