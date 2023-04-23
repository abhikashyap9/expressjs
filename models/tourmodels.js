const mongoose=require('mongoose');
const tourSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,'A tour must have a name'],
      unique:true
    },
    durations:{
        type:Number,
        required:[true,'A tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true,'A tour must have a group Size']
    },
    difficulty:{
        type:String,
        required:[true,'A tour must have difficulty']
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },

    rating:{
      type:Number,
      default:4.5
    },
    price:{
      type:Number,
      required:[true,'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required:[true,'A tour must have a cover page']
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startDate:[Date]  
   })   
  
   const Tour = mongoose.model('Tour',tourSchema)

   module.exports = Tour;