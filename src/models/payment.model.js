const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;


const PaymentModel = new Schema({
    customerId: { 
        type: String, 
         required: true 
     },

    loanId: { 
        type: String, 
         required: true 
     },

    amount: {
        type: String, 
         required: true 
    },

    dateTime: {
        type: Date,
        required: true 
    },

    paidToID: { 
        type: String, 
         required: true 
     }, 

  paidToName: { 
        type: String, 
         required: true 
     },

})

 const payments = mongoose.model('payments', PaymentModel);
  
  module.exports = payments;