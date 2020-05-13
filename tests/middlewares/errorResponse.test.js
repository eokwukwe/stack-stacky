import ErrorResponse from '../../src/helpers/errorResponse';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockErrorData = () => ({
  code: 'code',
  message: 'message',
});

describe('Http Error Response', () => {
  it('should return single object error', () => {
    const res = mockResponse();
    const error = mockErrorData();
    ErrorResponse.httpErrorResponse(res, error, 400);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error });
  });

  it('should return array of error objects', () => {
    const res = mockResponse();
    const errors = [mockErrorData()];
    ErrorResponse.httpErrorResponse(res, errors, 400);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors });
  });

  it('should return 500 if no error code is provided', () => {
    const res = mockResponse();
    const errors = [mockErrorData()];
    ErrorResponse.httpErrorResponse(res, errors);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should return a new error object', () => {
    const err = new ErrorResponse('message')
    expect(err.message).toBe('message');
  });
});
