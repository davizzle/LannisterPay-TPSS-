const express = require('express')
const { httpGetSamples } = require('./sample.controller')

const sampleRouter = express.Router()

sampleRouter.get('/', httpGetSamples)

module.exports = sampleRouter