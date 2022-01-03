import { connect } from "react-redux";
import { Registration } from "../components/Registration";
import {useState} from "react";
import {registerUser} from "../redux/actions/user"
import { useHistory } from "react-router-dom";
const RegistrationPage=({registerUser})=>{
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    username:"",
    firstName:"",
    lastName:"",
    password:"",
    phone:"",
    address:"",

  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const sendRegistrationForm= (e)=>{
    e.preventDefault();

    registerUser(form);
    history.push("/");
  }
    return(
      <div style={{marginLeft:"15%"}}>

  
        <Registration form={form} sendRegistrationForm={sendRegistrationForm} changeHandler={changeHandler}>

        </Registration>
      </div>
    )


}
const mapStateToProps = (state) =>({
    
  });
export default connect(mapStateToProps,{registerUser})(RegistrationPage)