export default {
  BAD_REQUEST: {
    code: 'input_err',
    type: 'BadRequest',
    message: 'Invalid input',
  },
  DUPLICATE_RECORD: {
    code: 'duplication_err',
    type: 'DuplicateRecord',
    message: 'Email or username already exist',
  },
  NOT_FOUND: {
    code: 'notfound_err',
    type: 'RecordNotFound',
    message: 'Item not found',
  },
  INTERNAL_SERVER_ERROR: {
    code: 'server_err',
    type: 'Server',
    message: 'Something went wrong',
  },
  INVALID_CREDENTIALS: {
    code: 'credential_err',
    type: 'InvalidCredentials',
    message: 'Email or password not correct',
  },
  UNAUTHORIZED_ACCESS: {
    code: 'unauthorize_err',
    type: 'UnauthorizedAccess',
    message: 'UnAuthorized Access. Enter a token',
  },
};
