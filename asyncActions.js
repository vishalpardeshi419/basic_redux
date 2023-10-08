const { default: axios } = require('axios')
const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware

const initialState ={
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

//ACTIONS
const fetchUserRequest= () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}


const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

//Reducer 
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST: 
            return {
                ...state,
                loading:true
            }
        
        case FETCH_USERS_SUCCESS: 
            return {
                ...state,
                users: action.payload,
                loading:false
            }

        case FETCH_USERS_FAILURE: 
            return {
                loading:false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

//STORE
const store = createStore(reducer, applyMiddleWare(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())