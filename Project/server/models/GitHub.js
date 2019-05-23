const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema References
const GitHubSchema = new Schema({
    user: JSON,
    response: JSON,
});

// Compile Schemas into Models
const GitHub = mongoose.model('GitHub', GitHubSchema);

// Export Models
module.exports = GitHub;