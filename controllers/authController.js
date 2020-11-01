// controller actions
module.exports.signup_get = (req, res) => {
    res.render('signup', { title: 'Sign up' });
}

module.exports.login_get = (req, res) => {
    res.render('login', { title: 'Login' });
}

module.exports.signup_post = async (req, res) => {
    res.send('new signup');
}

module.exports.login_post = async (req, res) => {
    res.send('user login');
} 