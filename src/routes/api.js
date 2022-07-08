const express = require('express')
const api = express.Router()

const sampleRouter = require('./split-payments/compute.router')

api.use('/split-payments', sampleRouter)

module.exports = api