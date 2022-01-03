import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    EMAIL_CONFIRMATION,
    EMAIL_CONFIRMATION_SUCCESS,
  } from "../constants/auth";
  import {USER_UNSET} from "../constants/user"
  const initialState = {
    requesting: false,
    successful: false,
    errors: [],
  };


  const reducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
      case LOGIN_REQUESTING:

        return {
          requesting: true,
          successful: false,
          errors: [],
        };
      case LOGIN_SUCCESS:
        return {
          errors: [],
          requesting: false,
          successful: true,
        };
      case LOGIN_FAILURE:
        return {
          errors: action.errors,
          requesting: false,
          successful: false,
        };
      case EMAIL_CONFIRMATION:
        return{
          requesting: true,
          successful: false,
          errors: [],
        }
        case EMAIL_CONFIRMATION_SUCCESS:
          return{
            requesting: false,
            successful: true,
            errors: [],
          }
      case USER_UNSET:
        return{
          errors:[],
          requesting:false,
          successful:false
        }
      default:
        return state;
    }
  };
  
  export default reducer;
  