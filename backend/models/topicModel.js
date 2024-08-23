const mongoose = require('mongoose');
const Subheading = require('../models/subheadingModel');

const TopicSchema = new mongoose.Schema({
    type: { 
        type: String,
        unique: true,
        required: true 
    },
    link: { 
        type: String,
        unique: true, 
        required: true 
    },
    subheadings: {
        type: [Subheading.schema], // Define the type as an array of Subheading schemas
        default: [],
    }
});

module.exports = mongoose.model('Topic', TopicSchema);
