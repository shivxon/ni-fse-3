require("./db")
const userModal = require("./modals/user.modal");

exports.handler = async (event, context) => {
    
    context.callbackWaitsForEmptyEventLoop = false;

    const queryParams = event.rawQueryString;
    const queryStringParameters = event.queryStringParameters

    console.log('queryParams', queryParams)
    const params = {};
    const queries = queryParams ? queryParams.split("&") : [];
    for (let i = 0; i < queries.length; i++) {
        const temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    const search = event.search ? event.search : params['search'];
    const page = event.page ? (event.page * 1 || 1) : (params['page'] * 1 || 1);
    const limit = event.limit ? (event.limit * 1 || 10) : (params['limit'] * 1 || 10);
    const skip = (page - 1) * limit;

    let query = {}
    if (search && search.trim()) {
        query = {
            'title': {
                '$regex': search,
                '$options': 'i'
            }
        };
    }
    let response = {}

    const list = await userModal.find(query).skip(skip).limit(limit);
    const listCount = await userModal.countDocuments(query)
    if (list) {
        response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            data: list,
            message: 'User list fetched sucessfully',
            page,
            limit,
            count: listCount
        };
    } else {
        response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            data: {},
            message: 'Something went wrong',

        };
    }
    return response;
};