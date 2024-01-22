
const Joi = require('joi')

async function validateCreateUser(event, response,) {
    try {
        const schema = Joi.object().keys({
            firstName: Joi.string().trim().required(),
            lastName: Joi.string().trim().required(),
            phone: Joi.number().required(),
        });
        const isValid = await validate(event, response, schema);
        return isValid
    } catch (error) {
        return error
    }
}


async function validateUpdateUser(event, response, next) {
    try {
        const schema = Joi.object().keys({
            id: Joi.string().trim().required(),
            body: Joi.object().keys({
                firstName: Joi.string().trim().optional(),
                lastName: Joi.string().trim().optional(),
                phone: Joi.number().required(),
            })
        });
        const isValid = await validate(event, response, schema);
        return isValid
    } catch (error) {
        return error
    }
}


async function validateUserDetails(event, response, next) {
    try {
        const schema = Joi.object().keys({
            id: Joi.string().trim().required(),
        });
        const isValid = await validate(event, response, schema);
        return isValid
    } catch (error) {
        return error
    }
}


const validate = async (event, response, schema) => {
    try {
        console.log('validate_1', event);
        const validation = await schema.validate(event, { abortEarly: false });
        console.log('validation', validation);
        if (validation.error) {
            const error = validation.error.details.map((e) => e = e.message);
            response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                data: { error },
                message: `Validation failed ${error}`,
            };
            return response;
        }
        return validation;
    } catch (err) {
        console.log(err);
        let response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            data: { err },
            message: 'Something went wrong',

        };
        return response
    }
}

module.exports = { validateCreateUser, validateUserDetails, validateUpdateUser }