
const createResponseObject = (data, message, pagination) => {

    return {
      data: data,
      message: message,
      error: null,
      pagination: pagination
    }
}

module.exports = createResponseObject

// We did this:
//if(Array.isArray(data)) return { data }
//else return { data: [data] }