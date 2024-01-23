require("./db")
const mongoose = require("mongoose");
const userModal = require("./modals/user.modal");
const validations = require("./validators/user.validators")

exports.handler = async (event, context) => {
    const userId = new mongoose.Types.ObjectId(event.id);
    const { phone, firstName, lastName } = event.body
    let response = {}
    let validationResp = await validations.validateUpdateUser(event, response)
    if (validationResp && validationResp.statusCode == 400) {
        return validationResp;
    }
    const userData = await userModal.findOne({ _id: userId })
    if (userData) {
        if (userData?.phone && !(userData?.phone == phone)) {
          let  phoneAlreadyExists = await userModal.findOne({ phone})
            if(phoneAlreadyExists) 
            {return response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                data: {},
                message: 'Phone number already used.'
            }
                
            }
        }

    const updatedValues  =  await userModal.findOneAndUpdate({ _id: userId }, {$set :{phone,firstName,lastName}}, {upsert : true})
        response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            data: {},
            message: 'User updated sucessfully',
        };
    } else {
        response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            data: event,
            body: JSON.stringify(event),
            message: 'Something went wrong',

        };
    }
    return response;
};