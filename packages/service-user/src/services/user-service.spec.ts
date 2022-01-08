import { Test, TestingModule } from '@nestjs/testing';
import { ModelUserModule } from '@delabs/model-user';
import { uuidV4 } from '@delabs/utils';
import { UserService } from './user-service';

describe('userService', () => {
  let userService: UserService;
  let createdUser;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ModelUserModule],
      controllers: [UserService],
      providers: [UserService]
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  it('createUser', async () => {
    const result = await userService.createUser({
      id: `${process.env.STAGE}:user:${uuidV4()}`,
      password: 'testPassword',
      name: 'testName'
    });
    // console.log(result);
    createdUser = result;
  });

  it('signInUser', async () => {
    const result = await userService.signInUser({
      id: createdUser.id,
      password: 'testPassword'
    });
    // console.log(result);
    expect(result.length).toBe(241);
  });

  it('listUser', async () => {
    const result = await userService.listUser();
    // console.log(result);
    expect(result[0]).toHaveProperty('index');
  });

  it('getUserByIndex', async () => {
    const result = await userService.getUserByIndex(createdUser.index);
    // console.log(result);
    expect(result.index).toBe(createdUser.index);
  });

  it('deleteUserByIndex', async () => {
    const result = await userService.deleteUserByIndex(createdUser.index);
    // console.log(result);
    expect(result.index).toBe(createdUser.index);
  });
});
