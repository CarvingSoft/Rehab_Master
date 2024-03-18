const mongoose = require('mongoose');
var moment = require('moment');

const clientLoginSchema = new mongoose.Schema(
    { 
       clientId : {type: mongoose.Schema.Types.ObjectId, ref:'client'},
       phoneNumber :{type: String, required: true},
       password:{type: String, required: true},
       image_url :{type: String},
       cloudinary_id : {type: String}
    }
)

const clientLoginModel = mongoose.model('ClientLogin',clientLoginSchema)

module.exports = clientLoginModel