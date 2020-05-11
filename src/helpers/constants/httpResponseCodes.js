export default {
  BAD_REQUEST: {
    code: 'input_err',
    type: 'BadRequest'
  },
  DUPLICATE_RECORD: {
    code: 'duplication_err',
    type: 'DuplicateRecord'
  },
  NOT_FOUND: {
    code: 'notfound_err',
    type: 'RecordNotFound'
  },
  INTERNAL_SERVER_ERROR: {
    code: 'server_err',
    type: 'Server'
  },
  INVALID_CREDENTIALS: {
    code: 'credential_err',
    type: 'InvalidCredentials',
  }
}