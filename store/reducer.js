

function counterReducer(state = { count: 0 }, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
}

function messagesReducer(state = { messages: [] }, action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return { ...state, messages: state.messages.concat(action.text) };
        default:
            return state;
    }
}

export { messagesReducer, counterReducer }