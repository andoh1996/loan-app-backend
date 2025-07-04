const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const SuccessResponse = require('../classUtils/CustomResponseClass');
const CustomError = require('../classUtils/customErrorClass');

const UserModel = require('../models/users.model');


const userServices = require('../modelServices/auth.service');
const factory = require('../modelServices/factory.service')
const userValidationSchema = require('../validators/users.validator')


const registerAdmin = async (req, res, next) => {
    try {
     ////////////////////Validating the user input////////////////
      const { error } = userValidationSchema.validate(req.body, { abortEarly: false });

     if (error) {
        const errors= error.details.map(err => err.message)
        throw new CustomError(400, errors);
      }
      // Extract and trim the password from the request body
      const password = req.body.password.trim();
  
      // Generate a user ID
      const staffID = uuidv4();
  
      // Check if email already exists 
      await userServices.checkUserEmail(req.body.email);
  
      // Hash the password with bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update request body with hashed password and generated userID
      req.body.password = hashedPassword;
      req.body.staffID = staffID;
  
      // Register the user 
    
      const createUser = await factory.saveToDb(UserModel, req.body)

      //////////////Check if the user is created//////
      if(!createUser){
         throw new CustomError(400, 'New user cannot be created');
      }
  
      const response = new SuccessResponse(201, 'success', createUser);
      return response.sendResponse(res);
  
    } catch (err) {
      return next(err);
    }
  };




///////////////user login handle///////////////
const Login = async (req, res, next) => {
    try {
      // Call the Login function from userServices using 
      const loginData = await userServices.userLogin(req.body);
  
      // If successful, send a 200 OK response with the results
      const response = new SuccessResponse(200, 'success', loginData);
      return response.sendResponse(res);
    } catch (err) {
     return next(err)
    }
};


  

  module.exports = {
    registerAdmin,
    Login,

  }