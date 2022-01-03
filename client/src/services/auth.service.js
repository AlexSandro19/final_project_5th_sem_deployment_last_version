import axios from "axios";

const storageName = "userData";
const loginUrl = "/api/auth/login";
const refreshUrl = "/api/auth/refreshUser";
const registerUrl = "/api/auth/register";
const confirmationUrl = "/api/auth/confirmation";
export const loginApi = (email, password) => {
  return axios
    .post(loginUrl, { email, password })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};
export const refreshUser = (user) => {
  return axios
    .post(refreshUrl, { email:user.email, userId:user.id })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};
export const registerApi = (name,email,username,password,phone,address) =>{
  return axios.post(registerUrl,{name,email,username,password,phone,address}).then((response)=>response.data).catch((error)=>{
    throw error.response.data;
  })
};
export const getEmailConfirmation = (hash)=>{
  console.log(hash);
  return axios.post(confirmationUrl,{hash}).then(response=>response.data).catch((error)=>{
    throw error.response.data;
  });
}
export const getLocalAuthToken = () =>
  JSON.parse(localStorage.getItem(storageName));

export const setAuthToken = (token) => {
  localStorage.setItem(storageName, JSON.stringify(token));
};

export const removeAuthToken = () => {
  localStorage.removeItem(storageName);
};
