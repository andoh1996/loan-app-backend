const SuccessResponse = require('../classUtils/CustomResponseClass');
const CustomError = require('../classUtils/customErrorClass');

const LoanModel = require('../models/loan.model');
const PaymentModel = require('../models/payment.model');
const UserModel = require('../models/users.model');
const CustomerModel = require('../models/customer.model');

const factory = require('../modelServices/factory.service');

const repayment = async(req, res, next) => {
    try {
        console.log(req.user.data)
        const {amount, loanId, customerId} = req.body

        const paymentAmount = Number(amount)

        const getLoan = await factory.fetchOneItemFromDb(LoanModel, {loanId});

        if(!getLoan){
             throw new CustomError(400, 'There is not active loan for this loan id');
        }

        const userData = await factory.fetchOneItemFromDb(UserModel, {staffID: req.user.data.staffID});

        const paymentData = {
            customerId: customerId, loanId: loanId, amount: amount, dateTime: new Date(), paidToID: req.user.data.staffID || '', paidToName: userData ? `${userData.firstName} ${userData.lastName}`: ''
        }

        const updateItem = {
            $inc: { paidAmount: paymentAmount, leftAmount: -paymentAmount}
        }

      await factory.updateIncreaseOrDecrease(LoanModel, {loanId, customerId}, updateItem);

       await factory.updateOneItemInDb(LoanModel, {loanId, customerId}, {paymentStatus: 'started'});

       const saveData = await factory.saveToDb(PaymentModel, paymentData)

       const response = new SuccessResponse(201, 'success', saveData);
        return response.sendResponse(res);
    } catch (error) {
         return next(error);  
    }
}


const repaymentHistory = async (req, res, next) => {
    try {
        const {loanId} = req.params
        const items = await factory.fetchItemsFromDB(PaymentModel, {loanId});

        const response = new SuccessResponse(201, 'success', items);
        return response.sendResponse(res);
    } catch (error) {
        return next(err); 
    }
}


const dailyPayment = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    // Combine payments + customer data in one query
    const items = await factory.aggregate(PaymentModel, [
      {
        $match: {
          dateTime: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        }
      },
      {
        $lookup: {
          from: 'customers', // this should be the actual collection name (check in MongoDB)
          localField: 'customerId',
          foreignField: 'customerId',
          as: 'customer'
        }
      },
      {
        $unwind: {
          path: '$customer',
          preserveNullAndEmptyArrays: true // just in case some payments have no linked customer
        }
      }
    ]);

    // Get the total sum (can also include $lookup if needed in summary)
    const dailySum = await factory.aggregate(PaymentModel, [
      {
        $match: {
          dateTime: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        }
      },
      {
        $group: {
          _id: null,
          totalAmountPaidToday: { $sum: '$amount' }
        }
      }
    ]);

    const data = {
      total: dailySum[0]?.totalAmountPaidToday || 0,
      items // contains payments + customer data
    };

    const response = new SuccessResponse(200, 'success', data);
    return response.sendResponse(res);
  } catch (err) {
    return next(err);
  }
};




module.exports = {
    repayment,
    repaymentHistory,
    dailyPayment
}
