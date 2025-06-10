const { v4: uuidv4 } = require('uuid')

const SuccessResponse = require('../classUtils/CustomResponseClass');
const CustomError = require('../classUtils/customErrorClass');

const LoanModel = require('../models/loan.model');
const CustomerModel = require('../models/customer.model');

const factory = require('../modelServices/factory.service');

const customerValidationSchema = require('../validators/customer.validator');


const requestLoan = async(req, res, next) => {
    try {
        const interestPercentage = req.body.interestPercentage
        const loanAmount = Number(req.body.loanAmount)
        const interestAmount = loanAmount * (Number(interestPercentage) /100)

        const totalAmount = loanAmount + interestAmount

        console.log(interestPercentage, loanAmount, interestAmount)
        

         const customerId = req.body.customerId;
         const customerData = await factory.fetchOneItemFromDb(CustomerModel, { customerId });

         if(!customerData){
            throw new CustomError(400, 'No customer found for  this Id');
         }
     
         const data = {
            customerId: req.body.customerId,
            loanId: uuidv4(),
            reason: req.body.reason,
            duration: req.body.duration,
            loanAmount: req.body.loanAmount,
            interestPercentage: req.body.interestPercentage,
            interestAmount: interestAmount,
            totalAmount: totalAmount,
            paidAmount: 0,
            leftAmount: totalAmount,
            requestDate: new Date()

         }
         const postLoan = await factory.saveToDb(LoanModel, data);

        const response = new SuccessResponse(201, 'success', postLoan);
       return response.sendResponse(res);
    } catch (err) {
          return next(err); 
    }
}


const pendingRequest = async (req, res, next) => {
    try {
        const loans = await factory.fetchItemsFromDB(LoanModel, { loanStatus: 'pending' });

        const loanDataPromises = loans.map(async (data) => {
            const customerId = data.customerId;
            const customerData = await factory.fetchOneItemFromDb(CustomerModel, { customerId });

            return {
                customerData: customerData,
                customerId: data.customerId,
                loanId: data.loanId,
                reason: data.reason,
                duration: data.duration,
                loanAmount: data.loanAmount,
                interestPercentage: data.interestPercentage,
                interestAmount: data.interestAmount,
                totalAmount: data.totalAmount,
                paidAmount: data.paidAmount,
                leftAmount: data.leftAmount,
                requestDate: data.requestDate
            };
        });

        const loanDetails = await Promise.all(loanDataPromises);

        const response = new SuccessResponse(200, 'success', loanDetails);
        return response.sendResponse(res);

    } catch (err) {
        return next(err);
    }
};

const approveLoan = async(req, res, next) => {
    try {
        const {loanId} = req.params

        if(!loanId){
            throw new CustomError(400, 'loanId required !!');
        }
        const today = new Date()
        const updateData = await factory.updateOneItemInDb(LoanModel, {loanId}, {loanStatus:'approved', approvedDate: today});

        const response = new SuccessResponse(200, 'success', updateData);
        return response.sendResponse(res);

    } catch (error) {
         return next(err);
    }
}

const getApprovedLoans = async(req, res, next) => {
    try {
        const loans = await factory.fetchItemsFromDB(LoanModel, {loanStatus: 'approved'});

        const loanDataPromises = loans.map(async (data) => {
        const customerId = data.customerId;
        const customerData = await factory.fetchOneItemFromDb(CustomerModel, { customerId });

        return {
            customerData: customerData,
            customerId: data.customerId,
            loanId: data.loanId,
            reason: data.reason,
            duration: data.duration,
            loanAmount: data.loanAmount,
            interestPercentage: data.interestPercentage,
            interestAmount: data.interestAmount,
            totalAmount: data.totalAmount,
            paidAmount: data.paidAmount,
            leftAmount: data.leftAmount,
            requestDate: data.requestDate,
            approvedDate: data.approvedDate,
            loanStatus: data.loanStatus
        };
    });

    const loanDetails = await Promise.all(loanDataPromises);

    const response = new SuccessResponse(200, 'success', loanDetails);
    return response.sendResponse(res);

    } catch (error) {
       return next(err); 
    }
}

const disburseLoans = async(req, res, next) => {
    try {
        const {loanId} = req.params

        if(!loanId){
            throw new CustomError(400, 'loanId required !!');
        }

        const today = new Date()

        const updateData = await factory.updateOneItemInDb(LoanModel, {loanId}, {loanStatus:'disbursed', disbursedDate: today, isActive: true});

        const response = new SuccessResponse(200, 'success', updateData);
        return response.sendResponse(res);
    } catch (error) {
        return next(err); 
    }
}

const getActiveLoans = async(req, res, next) => {
    try {
         const loans = await factory.fetchItemsFromDB(LoanModel, {isActive: true});

         const loanDataPromises = loans.map(async (data) => {
         const customerId = data.customerId;
         const customerData = await factory.fetchOneItemFromDb(CustomerModel, { customerId });

        return {
            customerData: customerData,
            customerId: data.customerId,
            loanId: data.loanId,
            reason: data.reason,
            duration: data.duration, 
            loanAmount: data.loanAmount,
            interestPercentage: data.interestPercentage,
            interestAmount: data.interestAmount,
            totalAmount: data.totalAmount,
            paidAmount: data.paidAmount,
            leftAmount: data.leftAmount,
            requestDate: data.requestDate,
            approvedDate: data.approvedDate,
            loanStatus: data.loanStatus,
            paymentStatus: data.paymentStatus,
            isActive: data.isActive,
            disbursedDate: data.disbursedDate,
            repaymentDate: data.repaymentDate
        };
     });

     const loanDetails = await Promise.all(loanDataPromises);

     const response = new SuccessResponse(200, 'success', loanDetails);
     return response.sendResponse(res);
    } catch (error) {
        return next(err); 
    }
}

module.exports = {
    requestLoan,
    pendingRequest,
    approveLoan,
    getApprovedLoans,
    disburseLoans,
    getActiveLoans
}
