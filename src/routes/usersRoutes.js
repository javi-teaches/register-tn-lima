// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/avatars'));
	},
	filename: function (req, file, cb) {
		let finalName = Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })

// ************ Middlewares ************
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/* GET to /users/register */
router.get('/register', guestMiddleware,  usersController.registerForm);

/* POST to /users/register */
router.post('/register', upload.single('user_avatar'), usersController.storeUser);

/* GET to /users/login */
router.get('/login', guestMiddleware, usersController.loginForm);

/* POST to /users/login */
router.post('/login', usersController.processLogin);

/* GET to /users/profile */
router.get('/profile', authMiddleware, usersController.profile);

/* GET to /users/logout */
router.get('/logout', usersController.logout);

module.exports = router;
