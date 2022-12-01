// implement your posts router here
const express = require('express')

const PostModel = require('./posts-model')

// since this will be a route instead of a server we now use Route middleware build into epxress.
//notice the capitalized Router method
const router = express.Router()


router.get('/', (req,res) => {
    PostModel.find()
      .then(value => {
        res.json(value)
    })
    .catch(err => {
        res.status(500).json({
            message: 'dam no bueno'
        })
    })
})


//this router will hold all our request to the POST endpoint and we will export it at the bottom,
//using export.modules

module.exports = router;