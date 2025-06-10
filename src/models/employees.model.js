const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;


const StaffModel = new Schema({
    staffID: { 
        type: String, 
         required: true 
     },

     firstName: {
       type: String,
       required: ['Please input your firstname', true],
     },
   
     lastName: {
       type: String,
       required: ['Please input your last name', true],
     },

     phoneNumber: {
         type: String, 
        required: true 
     },
   
     email: {
       type: String,
       required: ['Please input email', true],
       lowercase: true,
       unique: ['Email address already exist', true],
       validate: [validator.isEmail, 'Please provide correct email'],
     },

     location: {
        type: String, 
        required: true 
     },

     numberOfCustomers: {
        type: Number,
        default : 0
     }
 
  });


  const staffs = mongoose.model('staffs', StaffModel);
  
  module.exports = staffs;