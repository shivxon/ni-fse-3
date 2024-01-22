require("./db")
const userModal = require("./modals/user.modal");
const validations = require("./validators/user.validators")


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { phone, firstName, lastName } = event

  let response = {}
  let validationResp = await validations.validateCreateUser(event, response)

  if (validationResp && validationResp.statusCode == 400) {
    return validationResp;
  }

  const userExists = await userModal.findOne({ phone })
  if (userExists) {
    return response = {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      data: userExists,
      message: 'User already exists.'
    };
  }

  const user = await userModal.create({ phone, firstName, lastName });
  if (user) {
    response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      data: {},
      message: 'User created successfully'
    };
  } else {
    response = {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      data: {},
      message: 'Something went wrong'
    };
  }
  return response;
};