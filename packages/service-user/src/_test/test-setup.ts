import dotenv from 'dotenv';

/**
 * JEST 테스트시 환경변수 주입
 */
if (process.env.JEST_WORKER_ID || process.env.MOCHA_COLORS) {
  /** env 활용 */
  const testStage = 'local';
  process.env.STAGE;
  const testEnvPath = '../env/local.env';
  const { parsed: testEnv } = dotenv.config({
    path: testEnvPath
  });
  testEnv.STAGE = testStage;
  process.env = {
    ...process.env,
    ...testEnv
  };
  console.log('TEST-SETUP');
}
