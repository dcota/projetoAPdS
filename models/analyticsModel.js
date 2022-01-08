const mongoose = require('mongoose');

const analyticsSchema = mongoose.Schema({
    //'activityID': {'type': 'Number'},
    //'inveniraStdID': {'type': 'Number'},
    'access': {'type': Boolean},
    'downloadApp': {'type': Boolean},
    'viewModel': {'type': Boolean},
    'studentData': {'type': ['Mixed']},
    "hash": {'type': 'String'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('analyticsModel',analyticsSchema);