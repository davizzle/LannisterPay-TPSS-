const express = require('express')
const api = express.Router()

const sampleRouter = require('./sample/sample.router')

api.use('/', sampleRouter)

module.exports = api