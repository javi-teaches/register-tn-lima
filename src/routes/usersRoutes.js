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

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/* GET to /users/register */
router.get('/register', usersController.registerForm);

/* POST to /users/register */
router.post('/register', upload.single('user_avatar'), usersController.storeUser);

/* GET to /users/login */
router.get('/login', usersController.loginForm);

module.exports = router;
