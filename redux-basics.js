 const redux = require('redux');
 const createStore = redux.createStore;

 const initialStore = {
     counter: 0
 }

 const rootReducer = (state = initialStore, action) =>{
    if(action.type === 'INC_COUNTER'){
        return {
            ...state, 
            counter: state.counter + 1
        }
    }

    if(action.type === 'ADD_COUNTER'){
        return {
            ...state, 
            counter: state.counter + action.value
        }
    }
    return state;
 }

//Store
const store = createStore(rootReducer);
console.log(store.getState());

//Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
})      

//Dispatching action
store.dispatch({type: 'INC_COUNTER'}); //manda a llamar a rootreducer
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());