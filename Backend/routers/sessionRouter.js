const express = require('express');
const router =express.Router();
const Session = require('../models/session')
const SessionMaster = require('../models/session_mater');
const authToken = require('../routers/verifyToken');
const Assessment = require('../models/assessment');
const Slot = require('../models/slot');


router.post('/addsession', authToken,async(req,res)=>{
    try {
        const session = new Session({
            slotName:req.body.slotName,
            clientName:req.body.clientName,
            therapistName:req.body.therapistName
        })
        await session.save()
   
        const slot = await Slot.findByIdAndUpdate(req.body.slotName)
        slot.slotStatus = false

        await slot.save()

        res.send(session)
    } catch (error) {
        res.send(error)        
    }
})

router.get('/session', authToken,async(req,res)=>{
    try {
        const session = await Session.find({}).populate({
            path: 'therapistName',
            populate: {
            path: 'therapyCategory'
            }        
        }).populate('slotName').populate('clientName').sort('slotName')

        res.send(session)
        
    } catch (error) {
        res.send(error)
        
    }
})

router.get('/session/:id', authToken,async(req,res)=>{
    try {
        const session = await Session.findOne({_id: req.params.id}).populate('therapistName slotName clientName').sort('slotName')
        res.send(session)
        
    } catch (error) {
        res.send(error)
        
    }
})

router.get('/sessionbyclient/:id', authToken, async(req,res)=>{
    try {
        const session = await Session.find({clientName: req.params.id}).populate({
            path: 'therapistName',
            populate: {
            path: 'therapyCategory'
            }        
        }).populate('slotName').populate('clientName').sort('slotName')
        res.send(session)
        
    } catch (error) {
        res.send(error)
        
    }
})

router.patch('/session/:id', authToken, async(req,res)=>{
    try {
        const session = await Session.findByIdAndUpdate(req.params.id)
        session.slotName = req.body.slotName,
        session.clientName  = req.body.clientName,
        session.therapistName = req.body.therapistName

        await session.save()
        res.send(session)
        
    } catch (error) {
        res.send(error)
    }    
})

router.delete('/session/:id', authToken, async(req,res)=>{
    try {
        const id = req.params.id;

        const sessionMaster = await SessionMaster.findOne({session_id : id})
        if(sessionMaster){
            return res.status(400).send({message: 'There is a completed session exists'})
        }
        const session = await Session.findOne({_id:req.params.id})

        const slot = await Slot.findByIdAndUpdate(session.slotName)
        slot.slotStatus = true
        await slot.save()

        const sessionD = await Session.deleteOne({_id:req.params.id})
        res.send(sessionD)
    } catch (error) {
        res.send(error)
    }
})

router.patch('/su/:id', authToken,async(req,res)=>{
    try {
        const session = await Session.findById(req.params.id)
        session.remarks = req.body.remarks
        session.endDate = req.body.endDate
        session.status = req.body.status
        await session.save()

        res.send(session)       
    } catch (error) {
        res.send(error)       
    }
})

router.get('/session/slotstatus', authToken,async(req,res)=>{
    try {
        const session = await Session.find({}).populate('slotName')
        // if(session.slotName.slotStatus === true){
        //     console.log(session)
        // }

        res.send(session)       
    } catch (error) {
        res.send(error)       
    }
})


module.exports = router;