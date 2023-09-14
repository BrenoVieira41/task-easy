import { BelongsTo, Column, Table, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Users } from '../User/UserModel';

@Table({ tableName: 'tasks', timestamps: false })
export class Tasks extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  readonly id: number;

  @Column({ validate: { min: 3, max: 255 } })
  title: string;

  @Column({ validate: { min: 3, max: 255 } })
  topic: string;

  @Column({ defaultValue: false })
  finished: boolean;

  @Column({ type: DataTypes.FLOAT })
  time_amount: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @ForeignKey(() => Users)
  @Column
  user_id: number;

  @BelongsTo(() => Users, 'user_id')
  user: Users;
};

export interface ITask {
  title?: string,
  topic?: string,
  time_amount?: any,
  finished?: boolean,
  user_id?: number
}

export enum TaskEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}
