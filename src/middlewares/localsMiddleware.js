function localsMiddleware (req, res, next) {
	res.locals.isLogged = false;

	if (req.session.user != undefined) {
		res.locals.isLogged = true;
		res.locals.user = req.session.user;
	}
	
	next();
}

module.exports = localsMiddleware;