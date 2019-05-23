const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Mongoose Schema Reference
const UserSchema = new mongoose.Schema({
    email: String,
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, new Buffer(this.salt, 'binary'), 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = (password) => {
    const hash = crypto.pbkdf2Sync(password, new Buffer(this.salt, 'binary'), 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    const expiry = parseInt(expirationDate.getTime() / 1000, 10);
    return jwt.sign({ email: this.email, id: this._id, exp: expiry }, 'thou shall not pass');
};

UserSchema.methods.toAuthJSON = function () {
    const authResp = {
        _id: this._id,
        email: this.email,
        token: this.generateJWT()
    };

    return authResp;
};

// Compile Schema into Model and Export
module.exports = mongoose.model('User', UserSchema);