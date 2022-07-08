const express = require('express')
const { httpComputeData } = require('./compute.controller')

const sampleRouter = express.Router()

sampleRouter.post('/compute', httpComputeData)

module.exports = sampleRouter