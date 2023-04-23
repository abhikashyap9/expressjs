const dotenv=require('dotenv');
const fs =require('fs')
const mongoose=require('mongoose');
dotenv.config({path:'./config.env'})

const Tour =require('../../models/tourmodels')

const DB=process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
})
    .then(con=>{
        // console.log(con.connections)
        console.log('DB Connection Successful');
    })

const tour=JSON.parse(fs.readFileSync('tours-simple.json','utf-8'))

const importData=async()=>{
    console.log(tour)
    try{
      await Tour.create(tour)
      console.log('DATA successfully loaded')
    }
    catch(err){
      console.log(err)
    }
} 

const deleteData=async()=>{
    try{
        await Tour.deleteMany();
        console.log('DAta successfully deleted')
    }
    catch(err){
        console.log(err)
    }
}

if(process.argv[2]==='--import'){
    importData()
}
else{
    deleteData()
}
console.log(process.argv)