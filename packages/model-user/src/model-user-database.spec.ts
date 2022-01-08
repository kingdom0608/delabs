import { connection, reset, sync } from './model-user-database';

describe('model user database', () => {
  it('connection', async () => {
    const result: any = await connection();
    // console.log(result);
    expect(result.options.hasOwnProperty('stage')).toBeTruthy();
  });

  it('sync', async () => {
    const result = await sync({
      force: false
    });
    // console.log(result);
    expect(result).toBe('sync success');
  });

  it('reset', async () => {
    const result = await reset('WARN: DATABASE RESET');
    // console.log(result);
    expect(result).toBe('reset success');
  });
});
