
const createResponseObject = (data, message, error) => {
  
  // Marco did this:
  if(Array.isArray(data)) return { data }
  else return { data: [data] }
  
  // We had this:
    //return {
    //  data: null,
    //  message: "",
    //  error: null
    //}
}
