import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {fetchMovies} from "./Redux/actions/movie";
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Redux/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(fetchMovies());

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode >
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
