const express = require('express');
const router =express.Router();
const Assessment = require('../models/assessment');
const AssessmentMaster = require('../models/assessmentMaster');
const authToken = require('../routers/verifyToken');
const Client = require('../models/client');

router.post('/addassessment', authToken, async(req,res)=>{
    try {
        const existAssessment = await Assessment.findOne({slotName: req.body.slotName, assessmentDate: req.body.assessmentDate})

        if(existAssessment) {
            return res.status(400).send({message: 'Slot already alloted for this date'})
        }

        const assessment = new Assessment({
            assessmentSessionName : req.body.assessmentSessionName,
            slotName : req.body.slotName,
            clientName : req.body.clientName,
            therapistName : req.body.therapistName,
            assessmentDate :  req.body.assessmentDate,
            remarks: req.body.remarks,
            endDate: req.body.endDate
        })
        await assessment.save()

        const client = await Client.findByIdAndUpdate(assessment.clientName)
        client.status = 'AS'
        await client.save()

        res.send(assessment)
    } catch (error) {
        res.send(error)
    }
})

router.get('/assessment', authToken, async (req, res) => {
    try {
        let limit ;
        let offset;
    

        if(req.query.pageSize && req.query.page){
            limit = req.query.pageSize;
            offset = (req.query.page - 1)* req.query.pageSize;
        }

        const result = await Assessment.find().skip(offset).limit(limit).sort({ assessmentDate: -1 })
                .populate({
                  path: 'therapistName',
                  populate: {
                    path: 'therapyCategory',
                  },
                })
                .populate('slotName')
                .populate({
                  path: 'clientName',
                });
          
        
        let count  = await Assessment.countDocuments()


        if(req.query.page && req.query.pageSize){
            const response = {
                count : count,
                items : result
             
            }
            res.json(response)
          
        }
        else{
            res.json(result)
        }
        
    } catch (error) {
        res.send(error.message)
        
    }
});

  
  

router.patch('/assessment/:id', authToken, async(req,res)=>{
    try {
        const assessment = await Assessment.findByIdAndUpdate(req.params.id)
        assessment.slotName = req.body.slotName,
        assessment.clientName  = req.body.clientName,
        assessment.therapistName = req.body.therapistName,
        assessment.assessmentDate = req.body.assessmentDate

        await assessment.save()
        res.send(assessment)
        
    } catch (error) {
        res.send(error)
    }    
})

router.delete('/assessment/:id', authToken, async(req,res)=>{
    try {
        const id = req.params.id;

        const sessionMaster = await AssessmentMaster.findOne({assessment_id : id})
        if(sessionMaster){
            return res.status(400).send({message: 'There is a session master exists in this assessment session'})
        }
        const assessment = await Assessment.deleteOne({_id:req.params.id})
        res.send(assessment)
    } catch (error) {
        res.send(error)
    }
})

router.get('/assessment/:id', authToken, async(req,res)=>{
    try {
        const assessment = await Assessment.findOne({_id:req.params.id}).populate('clientName slotName therapistName')
        res.send(assessment)
        
    } catch (error) {
        res.send(error)
    }
})

router.get('/assessmentbyclient/:id', authToken, async(req,res)=>{
    try {
        const assessment = await Assessment.find({clientName: req.params.id})
        .sort({ assessmentDate: -1 })
        .populate('clientName slotName therapistName')
        res.send(assessment)
        
    } catch (error) {
        res.send(error)
    }
})

router.patch('/assessmentstatusupdate/:id',async(req,res)=>{
    try {
        const assessment = await Assessment.findOne({_id:req.params.id})
        assessment.remarks = req.body.remarks
        assessment.endDate = req.body.endDate
        assessment.status = req.body.status
        await assessment.save()

        res.send(assessment)       
    } catch (error) {
        res.send(error)       
    }
})

module.exports = router