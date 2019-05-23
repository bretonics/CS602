const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema References
const NewsShema = new Schema({
    dateObtained: Date,
    articles: JSON,
});

// Compile Schemas into Models
const News = mongoose.model('News', NewsShema);

// Export Models
module.exports = News;