import JwtHelper from '../../src/helpers/JwtHelper';

describe('JWT Helper Test', () => {
  describe('generate token test', () => {
    it('should return false if no payload is provided', async () => {
      const result = await JwtHelper.generateToken();
      expect(result).toBe(false);
    });

    it('should return truthy value', () => {
      const token = JwtHelper.generateToken({
        id: '5eb885db4c6ee23dd00fdaef',
      });
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });

  describe('verify token test', () => {
    it('should return false if no token is provided', () => {
      const result = JwtHelper.verifyToken();
      expect(result).toBe(false);
    });

    it('should return false if token is not string', () => {
      const result = JwtHelper.verifyToken(123456);
      expect(result).toBe(false);
    });

    it('should return verify token', () => {
      const token = JwtHelper.generateToken({
        id: '5eb885db4c6ee23dd00fdaef',
      });
      const result = JwtHelper.verifyToken(token);
      expect(result).toBeTruthy();
      expect(typeof result.id).toBe('string');
      expect(result.id).toEqual('5eb885db4c6ee23dd00fdaef');
    });
  });
});
