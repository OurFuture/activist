var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Get Involved.' })
})

// router.get('/:page', function(req, res, next) {
// 	if (req.params.page == 'sendgrid'){
// 		next()
// 		return
// 	}
//
//     res.render(req.params.page, { title: 'TODO Name Page' })
//
// })

module.exports = router
