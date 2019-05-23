const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema References
const FiveDayForecastSchema = new Schema({
    dateObtained: Date,
    response: JSON,
});

// Compile Schemas into Models
const FiveDayForecast = mongoose.model('FiveDayForecast', FiveDayForecastSchema);

// Export Models
module.exports = FiveDayForecast;