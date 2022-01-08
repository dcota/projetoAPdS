const mongoose = require('mongoose');

const deploySchema = mongoose.Schema({
    'activityID': {'type': 'Number'},
    'inveniraStdID': {'type': 'Number'},
    'json_params': {
        'summary': {'type': 'String'},
        'selectedBd': {'type': 'Number'},
        'selectedQueries': {'type': ['Mixed']}
    },
    "hash": {'type': 'String'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('deployModel',deploySchema);