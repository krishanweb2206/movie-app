import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from "redux";

import {Provider} from 'react-redux';

import './index.css';
import App from './components/App';
import rootReducer from "./reducers";
import { createContext } from 'react/cjs/react.production.min';

// internally call like logger(obj)(next)(action)
// const logger = function({dispatch,getState}){

//   return function(next){
//     return function(action){
//       // Middleware Code
//       console.log('ACTION_TYPE= ',action.type);
//       next(action)
//     }
//   }
// }

//  Second way of writing the middleware by using arrow functions
const logger = ({dispatch,getState}) => (next) => (action) =>{
  if (typeof action !== "function") {
   console.log("ACTION_TYPE= ", action.type);
  }
   next(action);
}

const thunk = ({dispatch,getState}) => (next) => (action) =>{

  if(typeof action === 'function'){
    action(dispatch);
    return;
  }
  next(action);
}
const store = createStore(rootReducer,applyMiddleware(logger,thunk));

//  Not required all this below because it is availaible in react-redux package
// export const StoreContext = createContext();
// console.log(StoreContext);

// class Provider extends React.Component{
//   render(){
//     const {store} = this.props;
//     return <StoreContext.Provider value={store}>
//       {/* Render the all childeren between the provider see in ReactDom */}
//       {this.props.children}
//     </StoreContext.Provider>
//   }
// }

// // console.log('store',store);
// // console.log("Before state", store.getState());

// // store.dispatch({
// //   type: "ADD_MOVIES",
// //   movies: [{ name: "Superman" }],
// // });

// // console.log("After state", store.getState());

// // const connectComponent = connect(maptoState)(App);

// export function connect(maptoState){
//   return function(Component){
//     // Problem is store is not available for constructor so we have to make an wrapper for so remove the return component
//     // return class connectComponent extends React.Component{
//       class ConnectComponent extends React.Component{
//       // Whenver the state is changed we have to render this component so add subcribe
//       constructor(props){
//         super(props);
//         this.unsubscribe=this.props.store.subscribe(() => this.forceUpdate());    //subscribe will return unsubscribe store get call in componentUnmount lifecycle

//       }
//       componentWillUnmount(){
//         this.unsubscribe();
//       }
      
//       render(){
//             const {store} = this.props;
//             const state = store.getState();
//             const datatobePassedasProps=maptoState(state);
//             return (
//             <Component {...datatobePassedasProps} dispatch={store.dispatch}/>
//             )
//       }
//     }

//     class ConnectComponentWrapper extends React.Component{
//       render(){
//         return (
//           <StoreContext.Consumer>
//             {(store)=><ConnectComponent store={store} />}
//           </StoreContext.Consumer>
//         )
//       }
//     }
//     return ConnectComponentWrapper;
//   }
// }


ReactDOM.render(
  // Wrap the app component so that store is available to all descandant of an app components
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

