const { v4: uuidv4 } = require('uuid')

const SuccessResponse = require('../classUtils/CustomResponseClass');
const CustomError = require('../classUtils/customErrorClass');

const CustomerModel = require('../models/customer.model');

const factory = require('../modelServices/factory.service');

const customerValidationSchema = require('../validators/customer.validator')

const createCustomer = async(req, res, next) => {
    try {
        const { error } = customerValidationSchema.validate(req.body, { abortEarly: false });

     if (error) {
        const errors= error.details.map(err => err.message)
        throw new CustomError(400, errors);
     }

     // Generate a user ID
     const customerId = uuidv4();

     req.body.customerId = customerId;

     const saveResponse = await factory.saveToDb(CustomerModel, req.body);

      const response = new SuccessResponse(201, 'success', saveResponse);
     return response.sendResponse(res);

    } catch (error) {
         return next(err);
    }
}


const getAllCustomer = async(req, res, next) => {
    try {
    const customers = await factory.fetchItemsFromDB(CustomerModel, {});

     const response = new SuccessResponse(201, 'success', customers);
     return response.sendResponse(res);

    } catch (error) {
       return next(err);  
    }
}

const getOneCustomer = async(req, res, next) => {
   try {

    const {customerId} = req.params
     const customers = await factory.fetchOneItemFromDb(CustomerModel, {customerId});

     const response = new SuccessResponse(200, 'success', customers);
     return response.sendResponse(res);
   } catch (error) {
    return next(err);  
   }
}

const assignCustomer = async(req, res, next) => {
    try {
        const {staffID, customerId} = req.body;

        const updateData = await factory.updateOneItemInDb(CustomerModel, {customerId}, {assignedStaffId:staffID, assignedToStaff:true});

         const response = new SuccessResponse(200, 'success', updateData);
         return response.sendResponse(res);
    } catch (error) {
       return next(err);   
    }
}


module.exports = {
    createCustomer,
    getAllCustomer,
    getOneCustomer,
    assignCustomer
}