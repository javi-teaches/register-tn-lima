const fs = require('fs');
const path = require('path');

// Users File Path
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper Functions
function getAllUsers() {
	let usersFileContent = fs.readFileSync(usersFilePath, 'utf-8');
	let usersArray;
	if (usersFileContent == '') {
		usersArray = [];
	} else {
		usersArray = JSON.parse(usersFileContent);
	}
	return usersArray;
}

function getUserById(id) {
	let allUsers = getAllUsers();
	let userFind = allUsers.find(oneUser => oneUser.id == id);
	return userFind;
}

function userCookieMiddleware (req, res, next) {
	if(req.cookies.user != undefined) {
		req.session.user = getUserById(req.cookies.user);
	}
	next();
}

module.exports = userCookieMiddleware;