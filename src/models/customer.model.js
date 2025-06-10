const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;


const CustomerModel = new Schema({
    customerId: { 
        type: String, 
         required: true 
     },

     firstName: {
       type: String,
       required: ['Please input your firstname', true],
     },

     middleName: {
          type: String,
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

     dateOfBirth: {
        type: Date, 
        required: true 
     },

     gpsCode: {
         type: String, 
        required: true 
     },

    location: {
         type: String, 
        required: true 
    },

     city: {
         type: String, 
        required: true 
    },

    region: {
       type: String, 
        required: true  
    },

    profession: {
        type: String, 
        required: true 
    },

    workPlace: {
         type: String, 
        required: true 
    },

    carNumber: {
        type: String, 
        required: true 
    },

    selfImage: {
        type: String, 
        required: true 
    },

    carImage: {
       type: String, 
        required: true   
    },

    ghanaCardFront: {
        type: String, 
        required: true 
    },

     ghanaCardBack: {
        type: String, 
        required: true 
    },

    active: {
        type: Boolean, 
        default: false 
    },

    assignedToStaff: {
        type: Boolean, 
        default: false 
    },

   assignedStaffId: {
       type: String, 
      default: ''   
    },
  });


  const customers = mongoose.model('customers', CustomerModel);
  
  module.exports = customers;