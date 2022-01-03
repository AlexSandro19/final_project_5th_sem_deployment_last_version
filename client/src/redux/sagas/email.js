import { takeLatest,take, call, put } from "redux-saga/effects";
import { getEmailConfirmation } from "../../services/auth.service";
import { EMAIL_CONFIRMATION,EMAIL_CONFIRMATION_SUCCESS } from "../constants/auth";
function* emailConfirmFlow(action){
    try{
        const  payload  =action.payload;
        console.log(payload);
        const response =yield call(getEmailConfirmation,payload);
        console.log(response);
        if(response.emailConfirmed){
            yield put({type:EMAIL_CONFIRMATION_SUCCESS})
        }
    }catch(e){
        console.log(e);
        throw e
    }
}
function* emailConfirmationWatcher(){
    yield takeLatest(EMAIL_CONFIRMATION,emailConfirmFlow);
 

}

export default emailConfirmationWatcher

