const router = require('express').Router();
const passport = require('passport');
const auth = require('../auth');
const Users = require('../../models/Users');

//--------------------------------------------------------------------------------
// API ROUTES

// POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res) => {
    const { body: { user } } = req;
    if (!user.email) {
        return res.status(422).json( { errors: { email: 'is required' } } );
    }
    
    if (!user.password) {
        return res.status(422).json( { errors: { password: 'is required' } } );
    }
    
    // Create final user as Mongoose Model and set password
    const finalUser = new Users(user);
    finalUser.setPassword(user.password);
    
    // Return authorized user saved to MongoDB
    return finalUser.save( res.json( { user: finalUser.toAuthJSON() } ));
});


// POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;
    
    if (!user.email) {
        return res.status(422).json( { errors: { email: 'is required' } } );
    }
    if (!user.password) {
        return res.status(422).json( { errors: { password: 'is required' } } );
    }
    
    
    return passport.authenticate('local', { session: false }, (err, passportUser) => {
        if (err) {
            return next(err);
        }
        
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            return res.json( { user: user.toAuthJSON() } );
        } else {
            return res.status(400).json({ errors: { user: "Not found" } });
        }

    })(req, res, next);
});


// GET current route (required) - only authenticated users have access
router.get('/current', auth.required, (req, res) => {
    const { payload: { id } } = req;

    // Look up user in MongoDB
    return Users.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json( { user: user.toAuthJSON() } );
        });
});

module.exports = router;
