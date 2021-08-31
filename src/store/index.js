import {Action} from "./action";
import throttle from 'lodash/throttle';
const redux = require("redux");

const initialState = {
    templates: [],
    menu: []
}

const appReducer=(state = initialState, action)=> {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case Action.ADD_TEMPLATE : {
            return {
                ...state,
                templates: {...state.templates, ...action.template}
            }
        }
        case Action.ADD_MENU: {
            return {
                ...state,
                menu: {...state.menu, ...action.menu}
            }
        }
        default:
            return state
    }
}
const createStore = redux.createStore;

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};

const peristedState = loadState();
const store = createStore(appReducer,peristedState)

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));


export default store;