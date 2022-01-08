import { Injectable } from '@nestjs/common';
import { Encryption, FilterToQuery } from '@delabs/utils';
import { UserModel, UserDeviceModel } from '@delabs/model-user';
import * as jwt from 'jsonwebtoken';

interface ISignInUser {
  id: string;
  password;
}

interface ICreateUser {
  id: string;
  password: string;
  name: string;
}

@Injectable()
export class UserService {
  private encryption: Encryption;
  private userFilter: FilterToQuery;

  constructor() {
    this.encryption = new Encryption();
    this.userFilter = new FilterToQuery({
      columns: [
        {
          alias: 'index',
          key: 'index'
        },
        {
          alias: 'status',
          key: 'status',
          publicFilter: {
            name: '유저 상태',
            description: '유저 상태'
          }
        }
      ],
      include: [
        {
          alias: 'devices',
          as: 'devices',
          model: UserDeviceModel,
          required: true
        }
      ]
    });
  }

  /**
   * 유저 생성
   * @param userData
   * @return {promise<UserModel>}
   */
  async createUser(userData: ICreateUser) {
    try {
      let user = null;

      await UserModel.sequelize.transaction(async (t) => {
        /** 유저 생성 */
        user = await UserModel.create(
          {
            id: userData.id,
            password: await this.encryption.createHash(userData.password),
            name: userData.name,
            status: 'ACTIVE'
          },
          {
            transaction: t
          }
        );

        if (user === null) {
          throw new Error('UserModel does not exist');
        }

        /** 유저 디바이스 생성 */
        await UserDeviceModel.create(
          {
            userIndex: user.index,
            status: 'ACTIVE'
          },
          {
            transaction: t
          }
        );
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  /**
   * 유저 로그인
   * @param userData
   */
  async signInUser(userData: ISignInUser) {
    const user = await this.getUserById(userData.id);

    if (user.password === this.encryption.createHash(userData.password)) {
      try {
        return await jwt.sign(
          { index: user.index, id: user.id, name: user.name, status: user.status },
          process.env.JWT_SECRET,
          {
            algorithm: process.env.JWT_ALGORITHM
          }
        );
      } catch (err) {
        throw new Error('User Token is incorrect');
      }
    } else {
      throw new Error('User password is incorrect');
    }
  }

  /**
   * 유저 리스트 조회
   * @param authFilter
   * @param pageQuery
   * @returns {promise<UserModel[]>}
   */
  async listUser(authFilter?: any, pageQuery = { filter: {} }) {
    const { where, limit, offset, include } = this.userFilter.parser(
      pageQuery,
      authFilter
    );

    return UserModel.findAll({
      subQuery: false,
      where,
      limit,
      offset,
      include
    });
  }

  /**
   * 유저 인덱스 조회
   * @param index
   * @return {promise<UserModel>}
   */
  async getUserByIndex(index: number) {
    const user = await UserModel.findOne({
      where: {
        index: index
      }
    });

    if (user === null) {
      throw new Error('User does not exist');
    }

    return user;
  }

  /**
   * 유저 아이디 조회
   * @param id
   * @return {promise<UserModel>}
   */
  async getUserById(id: string) {
    const user = await UserModel.findOne({
      where: {
        id: id
      }
    });

    if (user === null) {
      throw new Error('User does not exist');
    }

    return user;
  }

  /**
   * 유저 인덱스 삭제
   * @param index
   * @return {promise<UserModel>}
   */
  async deleteUserByIndex(index: number) {
    const user = await this.getUserByIndex(index);

    await UserModel.destroy({
      where: {
        index: index
      }
    });

    return user;
  }
}
