const express = require('express');
const router =express.Router();
const Company = require('../models/company');
const Slot = require('../models/slot');
const authToken = require('../routers/verifyToken');

router.post('/addcompany', authToken,async(req,res)=>{
    try {

        const {companyName, locationName, companyInChargeName, gstNo} = req.body;
        const company = new Company({companyName, locationName, companyInChargeName, gstNo})
        await company.save()
        res.send(company)       
    } catch (error) {
       return  res.send(error)       
    }
})

router.get('/company', authToken,async(req,res)=>{
    try {
        const company = await Company.find({})
        res.send(company)       
    } catch (error) {
      res.send(error)
    }
})

router.get('/company/:id', authToken,async(req,res)=>{
    try {
        const company = await Company.findOne({_id: req.params.id})
        res.send(company)       
    } catch (error) {
      res.send(error)
    }
})

router.patch('/company/:id', authToken,async(req,res)=>{
    try{ 
        const company = await Company.findByIdAndUpdate(req.params.id)
        company.companyName = req.body.companyName;
        company.companyInChargeName = req.body.companyInChargeName;
        company.gstNo = req.body.gstNo;
        company.locationName = req.body.locationName;

        await company.save();
        res.send(company);       
    }
    catch(error){
        res.send(error)
    }
})


router.delete('/company/:id', authToken,async(req,res)=>{
    try {
        const id = req.params.id;

        const slot = await Slot.findOne({therapyCompany : id})
        if(slot){
            return res.status(400).send({message: 'There is a slot exists in this company, please remove slot before delete company'})
        }
        const result = await Company.deleteOne({_id:req.params.id})
        res.send(result)
    } catch (error) {
        res.send(error)
    }
   
})


module.exports = router