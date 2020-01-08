const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Users File Path
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper Functions
function getAllUsers () {
	let usersFileContent = fs.readFileSync(usersFilePath, 'utf-8');
	let usersArray;
	if (usersFileContent == '') {
		usersArray = [];
	} else {
		usersArray = JSON.parse(usersFileContent);
	}
	return usersArray;
}

function generateId () {
	let users = getAllUsers();
	if (users.length == 0) {
		return 1;
	}
	let lastUser = users.pop();
	return lastUser.id + 1;
}

function storeUser (userData) {
	let users = getAllUsers();
	users.push(userData);
	fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
}

const controller = {
	registerForm: (req, res) => {
		res.render('users/registerForm');
	},
	storeUser: (req, res) => {		
		// Hasheo la contraseña
		req.body.user_password = bcrypt.hashSync(req.body.user_password, 11);
		// Genero la data del usuario
		let newUserData = {
			id: generateId(),
			avatar: req.file.filename,
			...req.body
		}
		// Guardo al usuario en el JSON
		storeUser(newUserData);
		// Redirección
		res.redirect('/');
	},
	loginForm: (req, res) => {
		res.send('Acá irá el formulario de login');
	}
};

module.exports = controller