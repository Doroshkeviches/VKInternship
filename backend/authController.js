const User = require('./models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

function generateAccessToken(id, roles) {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error, password 4 - 10 symbols', errors });
      }
      const { telNumber, password, name, lastName, date } = req.body;

      const candidate = await User.findOne({ telNumber });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'A user with the same name already exists' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        telNumber,
        password: hashPassword,
        name,
        lastName,
        date
      });
      await user.save();
      return res.json({ message: `The user has been successfully registered` });
    } catch (e) {
      res.status(400).json({ message: 'Registration error', e });
    }
  }

  async login(req, res) {
    try {
      const { telNumber, password } = req.body;
      const user = await User.findOne({ telNumber });
      if (!user) {
        return res.status(404).json({ message: `User ${telNumber} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Incorrect password` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      res.status(400).json({ message: 'Login failed' });
    }
  }
  async getUser(req, res) {
    try {
      const telNumber = req.query.name;
      const user = await User.findOne({ telNumber })
      if (!user) {
        return res.status(404).json({ message: `User ${telNumber} not found` });
      }
      res.json(user);

    } catch (e) {
      console.error;
    }
  }






}
module.exports = new authController();
