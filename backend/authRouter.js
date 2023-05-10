const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const minPasswordLenght = 4;
const maxPasswordLenght = 10;

router.post(
  `/registration`,
  [
    check('telNumber', 'Username cannot be empty').notEmpty(),
    check(
      'password',
      `Password must be more than ${minPasswordLenght} and less than ${maxPasswordLenght} characters`
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.post('/setPost',controller.setPost);
router.get('/getPosts', controller.getPosts)
router.post('/setMessages', controller.setMessages)
router.get('/getDialogue', controller.getDialogue)
router.post('/getOunPosts', controller.getOunPosts)
router.post('/setFrinedList', controller.setFrinedList)
router.post('/removeFrined', controller.removeFrined)
router.post('/getOunFriends', controller.getOunFriends)
router.post('/getUser', controller.getUser)





module.exports = router;
