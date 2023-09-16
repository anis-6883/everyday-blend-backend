const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    user_id: String,
    name: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
