const router = require('express').Router();
const Users = require('../../models/Users');

//--------------------------------------------------------------------------------
// API ROUTES
var id;

// Account details
router.get('/', (req, res) => {
    console.log(id);
    Users.findOne({ id })
    .then((user) => {
        console.log(user);
           res.json(user);
        });
});


// Open an account
router.post('/open', (req, res) => {
    
    const { email, password, phone, type, amount } = req.body;
    if(amount < 100) { res.send("Amount needs to be greater than 100"); }
    const user = {
        'email': email,
        'password': password,
        'phone': phone,
        'type': type,
        'amount': amount,
    }
    
    // Create final user as Mongoose Model and set password
    const finalUser = new Users(user);
    finalUser.setPassword(user.password);
    id = finalUser._id;

    // Return user saved to MongoDB
    return finalUser.save(res.json({ user: finalUser.toAuthJSON() }));

});


// Deposits
router.post('/deposit', (req, res) => {

});


// Withdrawals
router.post('/withdraw', (req, res) => {

});


// Transactions
router.post('/', (req, res) => {

});


module.exports = router;
