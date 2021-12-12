
const createResponseErrorObject = (error) => {

  return {
    data: null,
    message: `There's been an error: ${error}.`,
    error: null,
    pagination: null
  }
}

module.exports = createResponseErrorObject