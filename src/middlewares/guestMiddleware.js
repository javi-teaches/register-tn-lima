function guestMiddleware (req, res, next) {
	// Si no existe nada en la prop user de session
	if(req.session.user == undefined) {
		return next();
	}
	return res.redirect('/users/profile');
}

module.exports = guestMiddleware;