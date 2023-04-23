exports.saveUsers=(req,res)=>{
    res.status(201)
    .json({message:"User Saved successfully"})
 }

exports.getUsers=(req,res)=>{
     res.status(200)
     .json({message:"User rseterived successfully"})
  }

exports.deleleteUser=(req,res)=>{
     res.status(201)
     .json({message:"User Saved successfully"})
  }