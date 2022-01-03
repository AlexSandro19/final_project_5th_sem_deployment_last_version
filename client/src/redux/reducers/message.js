import {REGISTER_USER,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE,HIDE_MESSAGE} from "../constants/user"
const initialState={
    text:"",
    severity:"",
    isOpen:false,
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case REGISTER_USER_SUCCESS:
            return{
            text:action.message.text.message,
            severity:action.message.severity,
            isOpen:true
            }
        case REGISTER_USER_FAILURE:
            return{
                text:action.message.text.message,
                severity:action.message.severity,
                isOpen:true
            }
        case HIDE_MESSAGE:
            return{
                text:"",
                severity:"",
                isOpen:false,
            }
        default: 
        return state;
    }

}

export default reducer