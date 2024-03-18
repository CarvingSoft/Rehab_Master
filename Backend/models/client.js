const { boolean } = require('@hapi/joi')
const mongoose = require('mongoose')



const medicalSchema = new mongoose.Schema({
    pregnancy: {type:String, max:150},
    typeOfDelivery: {type:String, max:150},
    alcohol: {type:Boolean, default: false},
    smoking: {type:Boolean, default: false},
    medications : {type:String, max:150},
    pregnancyComplications: {type:String, max:150},
    pregnancyType :{type:String, max:150},
    prematureMonths: {type:String, max:150},
    babyCry: {type:String, max:150},
    feedingProblem: {type:String, max:150},
    sleepProblem: {type:String, max:150},
    birthWeight: {type:String, max:150},
    birthCompilcation: {type:String, max:150},
    importantIllness : {type:String, max:150},
    medicalCondition : {type:String, max:150},
    consanguineousMarriageHistory : {type:String, max:150},
    history : {type:String, max:150},
    remarksVision : {type:String, max:150},
    eyeTest : {type:Boolean, default: false, max:150},
    useGlass : {type:Boolean, default: false, max:150},
    eyeProblem : {type:Boolean, default: false, max:150},
    remarksHearing : {type:String, max:150},
    hearingTest : {type:Boolean, default: false, max:150},
    hearingAid : {type:Boolean, default: false, max:150},
    earProblem : {type:Boolean, default: false, max:150},
    currentMedication : {type:String, max:150},
    previoustMedication : {type:String, max:150},
    allergies : {type:String, max:150},
    actualTherapies:{type:String, max:150},
    previousTherapies : {type:String, max:150},
    headRaise : {type:String, max:150},
    rollOver : {type:String, max:150},
    independentSitting : {type:String, max:150},
    crawled : {type:String, max:150},
    pulledToStand : {type:String, max:150},
    independentStanding : {type:String, max:150},
    walking : {type:String, max:150},
    dress:{type:String, max:150},
    spoon : {type:String, max:150},
    saidFirstWords: {type:String, max:150},
    babbling : {type:String, max:150},
    presentLanguage : {type:String, max:150},
    fingerFeeding :{type:String, max:150},
    cloudinary_id : {type:String, max:150},
    file_url : {type:String, max:150}
        
})

const schoolSchema = new mongoose.Schema({
    schoolNameAndAddress: {type:String, max:150},
    grade: {type:String, max:150},
    teacherNameDetails: {type:String, max:150},
    previousSchool: {type:String, max:150},
    generalBehaviour: {type:String, max:150},
    teacherNoted: {type:String, max:150},
    getAlongWithOthers: {type:String, max:150},
    mainSupport: {type:String, max:150},
    screenTime: {type:String, max:150},
    playInterest: {type:String, max:150}

})

const routineSchema = new mongoose.Schema({
    feedAge:{type:String, max:150},
    goodAppetitie:{type:String, max:150},
    messyEater:{type:String, max:150},
    foodPreference:{type:String, max:150},
    tasteAndTexture:{type:String, max:150},
    canDoUpButtons:{type:String, max:150},
    canPutOnSocks:{type:String, max:150},
    canPutOnShoes:{type:String, max:150},
    toiletTrained:{type:String, max:150},
    dayAndNight:{type:String, max:150},
    accidents:{type:String, max:150},
    toiletPaperUse:{type:String, max:150},
    managingClothing:{type:String, max:150},
    washingHands:{type:String, max:150},
    bathingAndBrushing:{type:String, max:150},
    typicalNightSleep:{type:String, max:150},
    timeOfSleep:{type:String, max:150},
    remarksSleep:{type:String, max:150},
    typicalWakeup:{type:String, max:150},
    timeOfWakeup:{type:String, max:150},
    remarksWakeUp:{type:String, max:150},
    homework:{type:String, max:150},
    remarksHomework:{type:String, max:150},
    routineStrategies:{type:String, max:150},
    difficultSituation:{type:String, max:150},
    remarksChildBehaviour:{type:String, max:150},
    howYouKnowAboutUs:{type:String, max:150}
})

const clientSchema = new mongoose.Schema({
    firstName : {type:String, max:150},
    emergencyNumber: {type:Number},
    email : {type:String,required:true, max:150},
    dateOfBirth : {type:Date,required:false},
    gender: {type:String,required:true, max:150},
    nationality : {type:String, required:true, max:150},
    homeLanguage : {type:String, required:true, max:150},
    familyType : {type:String, required:true, max:150},
    familyMembers : {type:Array},
    referrerDetails : {type:String, max:150},
    reason : {type:String, required:true, max:150},
    fatherName : {type:String, required:true, max:150},
    fatherMobile : {type:Number, required:true},
    fatherOccupation : {type:String, required:true, max:150},
    motherName : {type:String, required:true, max:150},
    motherMobile : {type:Number, required:true},
    motherOccupation : {type:String, required:true, max:150},
    annualIncome : {type:String, max:150},
    siblingsDetails : {type:String, max:150},
    address1 : {type:String, required:true, max:150},
    address2 : {type:String, max:150},
    pincode : {type:Number,required:true},
    status : {type: String, default:'WL'},
    date : {type: Date, default: Date.now},
    remarks : {type: String},
    preferredTiming : {type: String},
    loginStatus : {type: Boolean},
    medical : medicalSchema,
    school: schoolSchema,
    routine: routineSchema
})



const clientModel = mongoose.model('client', clientSchema)


module.exports = clientModel