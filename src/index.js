import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

//default global configuration setting
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorizations'] = 'Auth token';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request=>{
    console.log('Request received in interceptors:', request);
    //we can edit request config here, before sending request
    return request;
}, error => {//only handle errors like internet failure
    console.log('Error received in interceptors:', error);
    return Promise.reject(error);
});
axios.interceptors.response.use(response=>{
    console.log('Response received in interceptors:', response);
    //we can edit response config here, before sending request
    return response;
}, error => {//only handle errors like internet failure
    console.log('Error received in interceptors:', error);
    return Promise.reject(error);
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
