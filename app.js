const express = require('express')
const app = express()
const tourRouter =require('./Routes/TourRoutes')
const userRouter =require('./Routes/UserRoutes')
var morgan = require('morgan')

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))

}

app.use(express.json())
app.use(express.static(`${__dirname}/public`));

// ....Middleware.......
app.use((req,res,next)=>{
console.log('helloo from the middleware')
next()
})

// .....routes....

app.use('/api/vi/users',userRouter)
app.use('/',tourRouter)




module.exports=app




