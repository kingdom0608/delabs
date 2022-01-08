import { Test, TestingModule } from '@nestjs/testing';
import { Encryption } from './encryption-util';

describe('encryption', () => {
  let encryption: Encryption;
  let encryptedData;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [Encryption],
      controllers: [],
      providers: []
    }).compile();

    encryption = app.get<Encryption>(Encryption);
  });

  it('createHash', () => {
    const result = encryption.createHash('encryptPassword');
    // console.log(result);
    expect(result).toEqual('54590d759b89069631c70464cec6cc54ba21');
  });

  it('encrypt', () => {
    const result = encryption.encrypt('encrypt');
    // console.log(result);
    encryptedData = result;
    expect(result.length).toEqual(44);
  });

  it('decrypt', () => {
    const result = encryption.decrypt(encryptedData);
    // console.log(result);
    expect(result).toEqual('encrypt');
  });
});
