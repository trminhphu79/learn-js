import { messagesReducer, counterReducer } from './reducer.js';
import { createStore, combineReducers } from '../lib/xStore/index.js';

const rootReducer = combineReducers({
    counter: counterReducer,
    messages: messagesReducer
});

const initCountState = { count: 0 };
const initMessages = { messages: ["Hello bro", "Tmp"] };

const store = createStore(rootReducer, { counter: initCountState, messages: initMessages });

export { store };
