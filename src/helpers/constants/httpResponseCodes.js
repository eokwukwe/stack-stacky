export default {
  BAD_REQUEST: {
    code: 'input_err',
    status: 400,
    type: 'BadRequest'
  },
  DUPLICATE_RECORD: {
    code: 'duplication_err',
    status: 409,
    type: 'DuplicateRecord'
  },
  NOT_FOUND: {
    code: 'notfound_err',
    status: 404,
    type: 'RecordNotFound'
  },
  INTERNAL_SERVER_ERROR: {
    code: 'server_err',
    status: 500,
    type: 'Server'
  }
}