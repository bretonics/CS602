const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema References
const DirectionsShema = new Schema({
    route: JSON,
    from: String,
    to: String,
});

// Compile Schemas into Models
const Directions = mongoose.model('Directions', DirectionsShema);

// Export Models
module.exports = Directions;