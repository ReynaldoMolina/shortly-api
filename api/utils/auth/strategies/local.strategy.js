const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

const UsersService = require('../../../services/users.service');

const service = new UsersService();

const LocalStrategy = new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await service.findByUsername(username);
      if (!user) {
        done(boom.unauthorized('El usuario no existe'), false);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized('La contraseña es incorrecta'), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;