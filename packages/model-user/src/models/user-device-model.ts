import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  Comment,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { UserModel } from './user-model';

@Table({
  tableName: 'UserDevice',
  defaultScope: {
    attributes: [
      'index',
      'userIndex',
      'token',
      'info',
      'status',
      'createdAt',
      'updatedAt'
    ]
  }
})
export class UserDeviceModel extends Model<UserDeviceModel> {
  @BelongsTo(() => UserModel)
  user: UserModel;

  @PrimaryKey
  @AutoIncrement
  @Column({
    comment: '인덱스',
    type: DataType.BIGINT
  })
  index: number;

  @ForeignKey(() => UserModel)
  @Column({
    comment: '유저 인덱스',
    type: DataType.BIGINT,
    allowNull: false
  })
  userIndex: string;

  @Column({
    comment: '토큰',
    type: DataType.STRING,
    allowNull: true
  })
  token: string;

  @Column({
    comment: '정보',
    type: DataType.TEXT,
    allowNull: true
  })
  info: string;

  @Comment('상태')
  @AllowNull(false)
  @Column({
    comment: '상태',
    type: DataType.STRING,
    allowNull: false
  })
  status: string;

  @CreatedAt
  @Column({
    comment: '생성 일자',
    type: DataType.DATE
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    comment: '갱신 일자',
    type: DataType.DATE
  })
  updatedAt: Date;
}
