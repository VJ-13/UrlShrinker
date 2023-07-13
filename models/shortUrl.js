// Import modules
const mongoose = require('mongoose');
const shortId = require('shortid');

// Schema
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

// Exporting schema
module.exports = mongoose.model('shortUrl', shortUrlSchema);