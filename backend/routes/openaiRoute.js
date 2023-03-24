const router = require('express').Router()
const openaiController = require('../controller/openaiController')


router.post('/generateImage',openaiController.generateImage)



module.exports= router