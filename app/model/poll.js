// app/model/poll.js
/*jslint node: true*/
/*jslint esnext: true*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    ip: 'String'
});

const optionsSchema = new Schema({
    option: String,
    votes: [voteSchema]
});

exports.pollSchema = new mongoose.Schema({
    question: { type: String, required: true},
    etag: Number,
    options: [optionsSchema],
});
