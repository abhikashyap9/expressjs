const Tour =require('../models/tourmodels');

exports.checkBody=(req,res,next)=>{
    
    if(!req.body.name && !req.body.email){
        return res.status(404).json({
            status:'fail',
            message:'invalidId'
        })
    }
    next()
}


exports.checkId=(req,res,next,val)=>{
    console.log(`Tour id is:${val}`) 
    next() 
}

exports.getSortsAndLimits=async(req,res,next)=>{
    req.query.limit='5'
    req.query.sort='-rating,price'
    req.query.fields='name,price,rating,summary,difficulty'
    next()
}


exports.getAllTour=async (req,res)=>{
    
    try{
        // console.log(req.query)
    
    // console.log(tour)
    // .where('difficulty')
    // .equals('High')
    // .where('durations')
    // .equals(1)
    
    // filtering

    const queryObj={...req.query}
    console.log('req',req.query)
    const excludeFields=['page','sort','limit','fields']
    excludeFields.forEach(el=>delete queryObj[el]);

//    advancefiltering
    let queryStr=JSON.stringify(queryObj)
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
    let params=JSON.parse(queryStr)
    console.log(params)
    let query= Tour.find(params)
    
 /////Sorting
    if(req.query.sort){
        console.log(req.query.sort)
        const sortBy=req.query.sort.split(',').join(' ');
        console.log('sort',sortBy)

        query=query.sort(sortBy)

    }
 /////Limiting fields

// one method is select:false in schema to hide a field
    if(req.query.fields){
        const fields=req.query.fields.split(',').join(' ');
        query=query.select(fields)
    }
    else{
        query=query.select('-__v');
    }


    //pagination

    const page=req.query.page * 1 || 1;
    console.log('page',page)
    const limit=req.query.limit * 1 || 100;
    console.log('limtValue',limit)
    const skip=(page-1)*limit;
    console.log('SkipValue',skip)
    query=query.skip(skip).limit(limit);




    const tour =await query
    // console.log('queryString',tour)


    return res.status(200)
    .json(
        {
        status:'success',
        results:tour.length,
        data:{tour}
        })
    }
   catch(err){
    return res.status(404).json({err:err})
   }
}

exports.getOneTour=async(req,res)=>{
    try{
        const tour=await Tour.findById(req.params.id)
        return res.status(200).json({status:'success',
        tour:tour.length,
        data:{tour}
    })
         }
         catch(err){
            return res.status(404).json({err:err})
         }
}

exports.createTour=async(req,res)=>{
    console.log(req.body);
    
    
    try{
    const newTour=await Tour.create(req.body)
    return res.status(201).send(newTour)
    }
    catch(err){
        console.log(err)
        return res.status(404).send({err:err})
     }

}

exports.updateTour=async(req,res)=>{
    try{

        const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({status:'success',data:{
            tour
        }})
    }
    catch(err){
        return res.status(404)
    }
}

exports.deleteTour=async(req,res)=>{
    
    try{
      const tour=await Tour.findByIdAndDelete(req.params.id)
      if(!tour){
        return res.status(400).json({err:'does not exits'})
      }
      res.status(204).json({status:'success',data:{
        tour
    }})}
    catch(err){
        return res.status(404)
    }
}
exports.deleteAllTour=async(req,res)=>{
    
    try{
      const tour=await Tour.deleteMany({})
      if(!tour){
        return res.status(400).json({err:'does not exits'})
      }
      res.status(204).json({status:'success',data:{
        tour
    }})}
    catch(err){
        return res.status(404)
    }
}