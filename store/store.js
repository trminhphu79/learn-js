import { combineReducers, messagesReducer, counterReducer } from './reducer.js';

function createStore(reducer, initialState, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer, initialState);
    }

    let state = initialState;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        // call all listeners to re-render component
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener, selector) => {
        let currentState;

        const handleChange = () => {
            const nextState = selector(state);
            // check if the selected state is changed -> re-render component
            if (nextState !== currentState) {
                currentState = nextState;
                listener();
            }
        };

        listeners.push(handleChange);
        handleChange(); // call it to initialize

        return () => {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    };

    dispatch({ type: '@@redux/INIT' });

    return { getState, dispatch, subscribe };
}

// function applyMiddleware(...middlewares) {
//     return (createStore) => (reducer, initialState) => {
//         const store = createStore(reducer, initialState);
//         let dispatch = store.dispatch;
//         const middlewareAPI = {
//             getState: store.getState,
//             dispatch: (action) => dispatch(action)
//         };
//         const chain = middlewares.map(middleware => middleware(middlewareAPI));
//         dispatch = chain.reduceRight((next, middleware) => middleware(next), dispatch);
//         return {
//             ...store,
//             dispatch
//         };
//     };
// }


const rootReducer = combineReducers({
    counter: counterReducer,
    messages: messagesReducer
});

const initCountState = { count: 0 };
const initMessages = { messages: ["Hello bro", "Tmp"] };

const store = createStore(rootReducer, { counter: initCountState, messages: initMessages });

export { store };
