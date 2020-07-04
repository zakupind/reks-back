import bcrpytjs from 'bcryptjs';

import { User } from './user.entity';

describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.password = 'testPassword';
    user.salt = 'testSalt';
  });

  describe('validatePassword', () => {
    it('returns true as password is valid', async () => {
      bcrpytjs.hash = jest.fn().mockReturnValue('testPassword');
      expect(bcrpytjs.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('1234');
      expect(bcrpytjs.hash).toHaveBeenCalledWith('1234', 'testSalt');
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      bcrpytjs.hash = jest.fn().mockReturnValue('wrongPassword');
      expect(bcrpytjs.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('wrongPassword');
      expect(bcrpytjs.hash).toHaveBeenCalledWith('wrongPassword', 'testSalt');
      expect(result).toEqual(false);
    });
  });
});
