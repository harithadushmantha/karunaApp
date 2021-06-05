import http from '../httpService/httpService';
//import config from '../utility/config.json';
import jwtDecode from 'jwt-decode';

const apiUrl ="https://eyeclinic.herokuapp.com/api/auth"
const tokenKey = "token";

http.setJwt(getJwt()); //calling the function in http service

export async function login(email,password)
{
    const {data: jwt} = await http.post(apiUrl,{email,password});
    localStorage.setItem(tokenKey,jwt);
    
}
export function logout()
{
    localStorage.clear();
}
export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey,jwt);
}
export function getCurrentUser() {

    try { 
        const jwt = localStorage.getItem(tokenKey); // getting token obj from localStorage
        return jwtDecode(jwt); // decoding the token
        
        } catch (ex) {
          return null;
        }
}

export function getJwt()
{
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    loginWithJwt,
    getCurrentUser,
    getJwt
}