import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

import {createStore, combineReducers,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import navigationReducer from './store/reducer/navigation';
import allPatientsReducer from './store/reducer/allPatients';
import PostOpsTypeReducer from './store/reducer/postOpsType';

import ProtetedRoute from '../src/Shared/ProtectedRoute';
import HomeLayout from './Layouts/HomeLayout';
import LoginLayout from './Layouts/LoginLayout';
import NotFound from './Modules/Errors/NotFound';

import './App.css';

const rootReducer = combineReducers({
  nav: navigationReducer,
  allpatients: allPatientsReducer,
  postops: PostOpsTypeReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

function App() {

  return (
    <Provider store = {store}>
      <ToastContainer/>
      <div className = "App">
        <Switch>
          <Route path="/login" exact component = {LoginLayout}/>      
          <ProtetedRoute path ="/" component ={HomeLayout}/>
          <Route path ="/notfound" component ={NotFound}/>
          <Redirect to ="/notfound"/>
        </Switch>
      </div>
      </Provider>
  );
}

export default App;
