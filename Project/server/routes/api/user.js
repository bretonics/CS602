// User API Router
const router = require('express').Router();
const passport = require('passport');
const auth = require('../../config/auth');
const User = require('../../models/User');

// User API Routes Using Passport

// API Route '/api/user'
router.post('/', auth.optional, (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ errors: { email: 'is required' } });
    }

    if (!password) {
        return res.status(422).json({ errors: { password: 'is required' } });
    }

    const user = { 'email': email, 'password': password }
    const finalUser = new User(user);
    finalUser.setPassword(user.password);

    return finalUser.save().then(() => res.json({ user: finalUser.toAuthJSON() }));
});



// API Route '/api/user/login' - (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ errors: { email: 'is required' } });
    }
    if (!password) {
        return res.status(422).json({ errors: { password: 'is required' } });
    }


    return passport.authenticate('local', { session: false }, (err, passportUser) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            return res.json({ user: user.toAuthJSON() });
        } else {
            return status(400).info;
        }

    })(req, res, next);
});


// API Route '/api/user/login' - (required, only authenticated user have access)
router.get('/current', auth.required, (req, res) => {
    const { payload: { id } } = req;

    const user = User.findById(id);
    if (!user) {
        return res.sendStatus(400);
    }
    else {
        return res.json({ user: user.toAuthJSON() });
    }
});

module.exports = router;
