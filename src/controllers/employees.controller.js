const SuccessResponse = require('../classUtils/CustomResponseClass');
const CustomError = require('../classUtils/customErrorClass');

const EmployeeModel = require('../models/employees.model');
const CustomerModel = require('../models/customer.model');

const factory = require('../modelServices/factory.service')
const helperFunction = require('../helpers/employee.helper')



const getAllEmployees = async(req, res, next) => {
    try {
        const employees = await factory.fetchItemsFromDB(EmployeeModel, {});

         // Sanitize and transform the response data
        const sanitizedData = employees.map(data => helperFunction.sanitizeUsersData(data));

        const response = new SuccessResponse(200, 'success', sanitizedData);
       return response.sendResponse(res);
    } catch (error) {
         return next(err);
    }
}

const getOneEmployee = async(req, res, next) => {
    try {
        const {staffID} = req.params
        const employee = await factory.fetchOneItemFromDb(EmployeeModel, {staffID});

        const sanitizedData  = helperFunction.sanitizeUsersData(employee);

        const response = new SuccessResponse(200, 'success', sanitizedData);
       return response.sendResponse(res);
    } catch (error) {
       return next(err); 
    }
}


const getCustomers = async(req, res, next) => {
    try {
        const {staffID} = req.params;

        const customers = await factory.fetchItemsFromDB(CustomerModel, {assignedStaffId: staffID});

        const response = new SuccessResponse(200, 'success', customers);
       return response.sendResponse(res);

    } catch (error) {
        return next(err); 
    }
}


module.exports = {
    getAllEmployees,
    getOneEmployee,
    getCustomers
}