const mongoose = require('mongoose'); //object
const Review = require('./Review');

// schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
       // min:0,
        required:true
    },
    desc:{
        type:String,
        trim:true
    },
    avgRating:{
     type:Number,
     default:0
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})
productSchema.post('findOneAndDelete' , async function(product){
    if(product.reviews.length > 0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})


// model/collection -> JS class -> objects/document
//model -> sigular & capital letter

let Product =  mongoose.model('Product' , productSchema);

module.exports = Product;