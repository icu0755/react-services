import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Posts from './services/Posts';
import { ServicesContext } from './services/Context';
import store from './store/store';

const postsService = new Posts('http://localhost:3010');
const services = {
    postsService,
};

ReactDOM.render(
    <React.StrictMode>
        <ServicesContext.Provider value={services}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ServicesContext.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
