const Bookmark = require('../models/bookmark')

module.exports.list = (req,res) => {
    Bookmark.find()
    .then((bookmarks) => {
        res.json(bookmarks)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.create = (req,res) => {
    const body = req.body
    const bookmark = new Bookmark(body)
    bookmark.save()
    .then((bookmark) => {
        res.json({
            notice : 'successfully created ',
            bookmark
        })
    })
    .catch((err) => {
        res.json(err)
    })
}



module.exports.show = (req,res) => {
    const id = req.params.id
    Bookmark.findById(id)
    .then((bookmark) => {
        if(bookmark){
            res.json(bookmark)
        } else {
            res.json({})
        }
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Bookmark.findByIdAndUpdate(id, body, { new : true, runValidators : true})
    .then((bookmark) => {
        if(bookmark){
            res.json(bookmark)
        } else {
            res.json({})
        }
    })
    .catch((err) => {
        res.json(err)
    })
}
module.exports.destroy = (req,res) => {
    const id = req.params.id
    Bookmark.findByIdAndDelete(id)
    .then((bookmark) => {
        if(bookmark){
            res.json(bookmark)
        } else {
            res.json({})
        }
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.redirecthash = (req,res) => {
    const hash = req.params.hash
    console.log("hash",hash)
    Bookmark.find({hashedUrl : hash})
    .then((bookmark) => {
        console.log("bookmark",bookmark)
        if(bookmark[0].hashedUrl == hash){
            return res.redirect(`${bookmark[0].original_url}`)
        } else {
            return res.json(bookmark)
        }
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.listtag = (req,res) => {
    const name = req.params.name
    Bookmark.find({tags :{$in : [name]}})
    .then((bookmark) => {
        res.json(bookmark)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.listnames = (req,res) => {
    const name= req.query.names
    console.log("name" ,name)
    Bookmark.find({tags : {"$all" : name.split(",")}})
    .then((bookmarks) => {
        res.json(bookmarks)
    })
    .catch((err) => {
        res.json(err)
    })
}