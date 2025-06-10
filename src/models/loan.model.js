const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;


const LoanModel = new Schema({
    customerId: { 
        type: String, 
         required: true 
     },

    loanId: { 
        type: String, 
         required: true 
     },

     reason: {
       type: String,
      required: true 
     },

     duration: {
       type: String,
      required: true 
     },
   
     loanAmount: {
       type: Number,
        required: true 
     },

     interestPercentage: {
         type: Number, 
        required: true 
     },
   
     interestAmount: {
       type: Number, 
       required: true 
     },

    totalAmount: {
       type: Number, 
       required: true 
     },

    paidAmount: {
       type: Number, 
       required: true 
     },

    leftAmount: {
       type: Number, 
       required: true 
    },

    loanStatus: { 
        type: String, 
        enum: ['pending', 'approved', 'disbursed', 'completed'],
        default: 'pending'
    },

    paymentStatus: {
         type: String, 
        enum: ['pending', 'started', 'completed'],
        default: 'pending'
    },

    isActive: {
        type: Boolean,
        default: false
    },

    requestDate : {
       type: Date,
       required: true
    },

    approvedDate : {
       type: Date,
       default: null
    },

     disbursedDate : {
       type: Date,
       default: null
    },

     repaymentDate : {
       type: Date,
       default: null
    }


  });


  const loans = mongoose.model('loans', LoanModel);
  
  module.exports = loans;