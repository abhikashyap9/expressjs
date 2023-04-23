const express=require('express')
const tourRouter=express.Router()
const tourController=require('../Controller/TourController')

// tourRouter.param('id',tourController.checkId)
// tourRouter.route('',tourController.checkBody)
tourRouter.route('/tours/top-5-cheap')
.get(tourController.getSortsAndLimits,tourController.getAllTour)


tourRouter.route('/api/v1/tours')
.get(tourController.getAllTour)
// .get(tourController.getOneTour)
// .delete(tourController.deleteAllTour)
// .post(tourController.createTour)

tourRouter.route('/:id')
.get(tourController.getOneTour)
.delete(tourController.deleteTour)
.patch(tourController.updateTour)


// tourRouter.route('/:id')
// .get(tourController.jsonData)


module.exports=tourRouter