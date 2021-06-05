import React from 'react';
import Login from '../Modules/Auth/login';

import {Route,Switch,Redirect} from 'react-router-dom';
const LoginLayout = () => {
    return ( 
      <Switch>
      <Route path ="/login" exact component ={Login}/>

     
      <Redirect to ="/login"/>
      <Redirect to ="/notfound"/>
  </Switch>
     );
}
 
export default LoginLayout;