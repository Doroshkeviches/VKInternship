const User = require('./models/User');
const Posts = require('./models/Posts');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');
const Messages = require('./models/Messages');
const FriendList = require('./models/FriendList');

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
  async setPost(req, res) {
    try {
      const { author, content, createdAt, images, likes } = req.body
      const post = new Posts({
        author,
        content,
        createdAt,
        images,
        likes,
      });
      await post.save()
      return res.json({ message: `The post saved` })
    } catch (e) {
      console.error;
    }
  }
  async getPosts(req, res) {
    try {
      const posts = await Posts.find()
      return res.json(posts)
    } catch (e) {
      console.error;
    }
  }
  async setMessages(req, res) {
    try {
      const { username, context, createdAt } = req.body
      const messages = new Messages({
        username,
        context,
        createdAt,
      });
      await messages.save()
      return res.json({ message: `The message saved` })
    } catch (e) {
      console.error;
    }
  }
  async getDialogue(req, res) {
    try {
      const messages = await Messages.find()
      return res.json(messages)
    } catch (e) {
      console.error;
    }
  }
  async getOunPosts(req, res) {
    try {
      const { username } = req.body
      const posts = await Posts.find({
        "author.name": username
      })
      return res.json(posts)
    } catch (e) {
      console.error;
    }
  }
  async setFrinedList(req, res) {
    try {
      const { username, friend} = req.body
      const candidate = await FriendList.findOne({ username });
      if (candidate) {
       await candidate.update({
          username: username,
          friends: [...candidate.friends, friend]
        })
        res.json(candidate)
      } else {
        const list = new FriendList({
          username: username,
          friends: [friend]
        });
        await list.save();
        return res.json({ message: `The friend has been successfully registered` });

      }
    
    } catch (e) {
      console.error;
    }
  }
  async removeFrined(req, res) {
    try {
      const { username, friend} = req.body
      const candidate = await FriendList.findOne({ username });
      if (candidate) {
       await candidate.update({
          username: username,
          friends: candidate.friends.filter((item) => item !== friend)
        })
        res.json(candidate)
      } else {
        
        return res.json({ message: `no friend with same username` });

      }
    } catch (e) {
      console.error;
    }
  }
  async getOunFriends(req, res) {
    try {
      const { username } = req.body
      const list = await FriendList.findOne({
        "username": username
      })
      return res.json(list.friends)
    } catch (e) {
      console.error;
    }
  }
  async getUser(req, res) {
    try {
      const { username } = req.body
      const user = await User.findOne({
        name: username
      })
      return res.json(user)
    } catch (e) {
      console.error;
    }
  }





}
module.exports = new authController();
