const InvariantError = require('../../exceptions/InvariantError');
const { UserPaloadSchema } = require('./schema');

const UserValidator = {
  validateUserPayload: (payload) => {
    const validationResult = UserPaloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UserValidator;
