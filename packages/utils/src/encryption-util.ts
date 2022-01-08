import * as CryptoJS from 'crypto-js';
import * as pbkdf2 from 'pbkdf2';

export class Encryption {
  /** salt 값 */
  salt;
  /** 암호화 방식 */
  digest;
  /** 암호화 횟수 */
  iterations;
  /** 암호화 길이 */
  keyLength;

  constructor() {
    this.salt = process.env.ENC_SALT;
    this.digest = process.env.ENC_DIGEST;
    this.iterations = 5;
    this.keyLength = 18;
  }

  /**
   * hash 값 생성
   * @param password
   * @return string
   */
  createHash(password): string {
    let derivedKey = pbkdf2.pbkdf2Sync(
      password,
      this.salt,
      this.iterations,
      this.keyLength,
      this.digest
    );
    return derivedKey.toString('hex');
  }

  /**
   * 암호화
   * @param text
   * @return string
   */
  encrypt(text: string) {
    return CryptoJS.AES.encrypt(text, this.salt).toString();
  }

  /**
   * 복호화
   * @param text
   * @return string
   */
  decrypt(text: string) {
    let bytes = CryptoJS.AES.decrypt(text.toString(), this.salt);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
