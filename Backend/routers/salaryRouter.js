const express = require('express')
const router = express.Router();
const authToken = require('../routers/verifyToken');
const sessionMaster = require('../models/session_mater')
const assesmentMaster = require('../models/assessmentMaster')
const groupMaster = require('../models/groupMaster')


router.post ('/getsalary', authToken, async(req, res)=>{
    const {startDate, endDate, therapistId} = req.body;
    
    try {
      // const result = await sessionMaster.find({ therapistId: therapistId , date: {$gte : startDate, $lte : endDate}})
    
      const result1 = await sessionMaster.aggregate([
      // {
      //   $match:{}
      // }
      //  { $match: {therapistId:mongoose.Types.ObjectId(therapistId)}},

      { $match: { date: {$gte : new Date(startDate), $lte : new Date(endDate)} }},

       {$group:{_id:"$therapistId", Total: {$sum:"$amountToTherapist"},TotalSession: { $sum: 1 }}},
      
       {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: '_id',
          as: "therapistId",
        },
      },
      {
        $unwind:{path:'$therapistId'}
      },
      {$project:{TotalSession:1,Total:1, "therapistId.name":1}}
      ]);
      res.send(result1) 
    } catch (error) {
      res.send(error)
    }
  })

  router.post('/assesmentsalary', authToken, async(req,res)=>{
    const {startDate, endDate} = req.body
    try {
        const assesment = await assesmentMaster.aggregate([
          { $match: { date: {$gte : new Date(startDate), $lte : new Date(endDate)} }},
          { $group:{_id:"$therapistId", Total: {$sum:"$amountToTherapist"},TotalSession: { $sum: 1 }}},
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: '_id',
              as: "therapistId",
            },
            
          },
          {
            $unwind:{path:'$therapistId'}
          },
          {$project:{TotalSession:1,Total:1, "therapistId.name":1}}
          
        ])
        res.send(assesment);
    } catch (error) {
      console.log(error);
    }

  })


  router.post('/groupsalary', authToken, async(req,res)=>{
     
    const {startDate, endDate}= req.body
    
    try {
         const groupSalary = await groupMaster.aggregate([
        { $match: { date: {$gte : new Date(startDate), $lte : new Date(endDate)} }},
    
        { $group:{_id:"$therapistName"}},
        {$group:{_id:"$_id"}},
        {
          $unwind:{path:'$_id'}
        },
    
      
      ])
      res.send(groupSalary)
    } catch (error) {
        console.log(error);
    }

   

    
  })






  
  module.exports = router;