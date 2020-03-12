const express = require('express')
const router = express.Router()
const bookmarksController = require('../app/controllers/bookmarksController')

router.get('/bookmarks', bookmarksController.list)
router.post('/bookmarks', bookmarksController.create)
router.get('/bookmarks/tags', bookmarksController.listnames)
router.get('/bookmarks/:id', bookmarksController.show)
router.put('/bookmarks/:id', bookmarksController.update)
router.delete('/bookmarks/:id', bookmarksController.destroy)

router.get('/:hash', bookmarksController.redirecthash)
router.get('/bookmarks/tags/:name', bookmarksController.listtag)


module.exports = router