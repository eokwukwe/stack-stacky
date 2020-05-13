import Authentication from '../../src/middlewares/Authentication';
import JwtHelper from '../../src/helpers/JwtHelper';

const mockRequest = (token) => ({
  headers: {
    authorization: token,
  },
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe('Authentication Middleware', () => {
  describe('Verify User', () => {
    const token = JwtHelper.generateToken({ id: 'sirk4jr8jrje8rj59ryrj4' });

    it('should return 401 if token is not set', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      await Authentication.verifyUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should call next if token is set', async () => {
      const req = mockRequest(token);
      const res = mockResponse();
      const next = mockNext;
      await Authentication.verifyUser(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 if token is invalid', async () => {
      const req = mockRequest(`${token}de`);
      const res = mockResponse();
      const next = mockNext();
      await Authentication.verifyUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
