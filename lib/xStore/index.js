
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


function combineReducers(reducers) {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {});
    };
}

export { createStore, combineReducers };
