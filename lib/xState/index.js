function createStore(reducer, initialState, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer, initialState);
  }

  let state = initialState;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action); // change sate
    // call all listeners to re-render component
    listeners.forEach((changeFn) => changeFn());
  };

function subscribe(listener, selector) {
    let currentState = "1";

    const handleChange = () => {
      const nextState = selector(state);
      // check if the selected state is changed -> re-render component
      if (nextState !== currentState) {
        currentState = nextState;
        listener(); // hàm render bên ngoài
      }
    };

    listeners.push(handleChange); // add listener to listeners array

    handleChange(); // call it to initialize
  }

  dispatch({ type: "xState/TMP" });

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
