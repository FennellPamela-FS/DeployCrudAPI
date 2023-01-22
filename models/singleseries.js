// Series Schema
const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // title is required
    },
    description: {
        type: String,
        required: true // description is required
    },
    videolink: {
        type: String,
        required: true // video link is required
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now  // show the time each item above was created
    },
});

module.exports = mongoose.model("Series", seriesSchema);