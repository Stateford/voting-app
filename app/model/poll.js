// app/model/poll.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
    ip: 'String'
});

var optionsSchema = new Schema({
    option: String,
    votes: [voteSchema]
})

exports.pollSchema = new mongoose.Schema({
    question: { type: String, required: true},
    etag: Number,
    options: [optionsSchema],
});
