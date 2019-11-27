let configInstagram = require('../config/instagram');

app.get('/auth', (req, res) => {
	res.send(req.query.code);
});

app.get('/login', (req, res) => {
	res.redirect(configInstagram.config.authUrl);
});