import React from 'react';
import auth from '../Services/authService/authService';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({path,component:Component,...rest}) => {
    return ( 
        <Route 
              path = {path}
              render = {props => {
                  
                if(!auth.getCurrentUser()) {
                    return <Redirect to= {{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>;
                }
                return <Component {...props} />
              } }/>
     );
}
 
export default ProtectedRoute;