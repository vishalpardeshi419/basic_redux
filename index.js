const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducer = redux.combineReducers
const applyMiddleWare = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake() {
    return { 
        type: BUY_CAKE
    }
}

function buyIceCream() {
    return { 
        type: BUY_ICECREAM
    }
}

//initia State
const initialCakesState = {
    numberOfCakes: 10
}

const initialceCreamState = {
    numberOfIceCream: 10
}

//Reducer
// State and action
const cakeReducer = (state = initialCakesState, action) => {
    console.log('action',action)
    switch(action.type) {
        case BUY_CAKE: 
        return {
            ...state,  // create copy of original state
            numberOfCakes: state.numberOfCakes - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialceCreamState, action) => {
    console.log('action',action)
    switch(action.type) {
        case BUY_ICECREAM: 
        return {
            ...state,  // create copy of original state
            numberOfIceCream: state.numberOfIceCream - 1
        }
        default: return state
    }
}

const rootReducer = combineReducer({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleWare(logger))
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe()