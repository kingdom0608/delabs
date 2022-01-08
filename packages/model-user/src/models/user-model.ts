import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import { UserDeviceModel } from './user-device-model';

@Table({
  tableName: 'User',
  defaultScope: {
    attributes: ['index', 'id', 'password', 'name', 'status', 'createdAt', 'updatedAt']
  },
  scopes: {
    private: {
      attributes: []
    }
  },
  indexes: []
})
export class UserModel extends Model<UserModel> {
  @HasMany(() => UserDeviceModel)
  devices: UserDeviceModel[];

  @PrimaryKey
  @AutoIncrement
  @Column({
    comment: '인덱스',
    type: DataType.BIGINT
  })
  index: number;

  @Column({
    comment: '아이디',
    type: DataType.STRING,
    allowNull: false
  })
  id: string;

  @Column({
    comment: '비밀번호',
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @Column({
    comment: '이름',
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

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
