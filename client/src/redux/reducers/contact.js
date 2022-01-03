import { CONTACT_FORM_SENDING, CONTACT_FORM_SUCCESS } from "../constants/contact";

const initialState = {
    requesting: false,
    successful: false,
    message: "",
  };


  const reducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
      case CONTACT_FORM_SENDING:
        console.log("here");
        return {
          requesting: true,
          successful: false,
          message: "",
        };
      case CONTACT_FORM_SUCCESS:
        return {
          message: action.payload.message,
          requesting: false,
          successful: true,
        };
      default:
        return state;
    }
  };
  
  export default reducer;