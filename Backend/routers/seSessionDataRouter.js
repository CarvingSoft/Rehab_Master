const express = require('express');
const router = express.Router();
const SeSessionData = require('../models/seSessionData')
const authToken = require('../routers/verifyToken');

router.post('/sesessiondata', authToken, async(req,res)=>{
    try {
        const seSessionData = new SeSessionData({
            date:req.body.date,
            updatedDate:req.body.updatedDate,
            session_master_id:req.body.session_master_id,
            seDatas:req.body.seDatas
        })
        await seSessionData.save()

        res.send(seSessionData)

    } catch (error) {
        res.send(error)
    }
})


router.get('/sesessiondata', authToken,async(req,res)=>{
    try {
        const seSessionData = await SeSessionData.find({}).sort({date: -1})
        .populate('session_master_id seDatas.goal')

        res.send(seSessionData)  

    } catch (error) {
        res.send(error)       
    }
})


router.get('/sesessiondata/:id', authToken,async(req,res)=>{
    try {
        const seSessionData = await SeSessionData.findOne({_id:req.params.id}).populate('session_master_id seDatas.goal')

        res.send(seSessionData) 

    } catch (error) {
        res.send(error)       
    }
})

router.get('/sesession/:id', authToken,async(req,res)=>{
    try {      
        const seSessionData = await SeSessionData.findOne({session_master_id: req.body.session_master_id})

        res.send(seSessionData)  

    } catch (error) {
        res.send(error)       
    }
})


router.get('/sedata/:seId/:arrayId', authToken,async(req,res)=>{
    try {
        arrayId = req.params.arrayId
        seId = req.params.seId
        
        const seData = await SeSessionData.where('_id').equals(req.params.seId).findOne({'seDatas._id' : arrayId}).populate("seDatas.goal")       
        
        res.send(seData)
    
    } catch (error) {
        res.send(error)       
    }
})


router.patch('/upadatese/:seId/:arrayId', authToken, async(req, res) =>{
    try {

        const {goal, notes, response, activities, status} = req.body
        
        const arrayId =req.params.arrayId

        const seSessionData = await SeSessionData.where('_id').equals(req.params.seId).updateOne(
            {
                "seDatas._id":arrayId
            },
            {
              $set : {
                        "seDatas.$.notes": notes,
                        "seDatas.$.response": response,
                        "seDatas.$.activities": activities,
                        "seDatas.$.status": status
                },
                            
            }
        )

        res.send(seSessionData)     
         
    } catch (error) {
        return res.send(error)
    }
})


module.exports = router