const mongoose = require('mongoose')
const valildator = require('validator')
const sh = require('shorthash')

const Schema = mongoose.Schema
const bookmarkSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    original_url : {
        type : String,
        validate : {
            validator : function(value){
                return valildator.isURL(value)
            },
            message : 'URL Validation is failed'
        },
        required : true
    },
    tags : {
        type : [String],
        required : true
    },
    hashedUrl : {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now()

    }

})

bookmarkSchema.pre("save",function(next){
    this.hashedUrl = sh.unique(this.original_url)
    next()
})

const Bookmark = mongoose.model('Bookmark',bookmarkSchema)
module.exports = Bookmark